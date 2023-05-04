import { call, delay, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { FETCH_STEP, SAVE_STEP_GOAL, SET_STEP_GOAL, setStepDataAction, setStepErrorAction, setStepGoalAction } from '../actions/stepAction';
import { useHealthKit } from '../../../utils/appleHealthKitUtil';
import { IStepAction, IStepData, IStepGoalHistory, IStepHistory } from '../../interfaces/stepInterface';
import { HealthInputOptions, HealthValue } from 'react-native-health';
import { getDateBefore } from '../../../utils/dateUtil';
import { StorageService } from '../../service/storageservice';
import { STEP_GOAL_HISTORY } from '../../../constants/StorageKey';

function* convertData(data: HealthValue[]) {
  const result:IStepHistory[] = [];

  const defaultStepHistoryData = {};
  const stepGoalHistory:IStepGoalHistory = yield call(StorageService.getItem, STEP_GOAL_HISTORY, defaultStepHistoryData);

  // Group data by date
  const groups = data.reduce((acc: any, curr: any) => {
    const date = new Date(curr.startDate).toLocaleDateString("en-US");
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(curr);
    return acc;
  }, {});

  // Iterate over each date group
  Object.entries(groups).forEach(([dateString, group]:any) => {
    const parts = dateString.split('/');
    const dateObj = new Date(parts[2], parts[0] - 1, parts[1]);

    // Calculate total steps for the day
    const stepTotal = group.reduce((acc: any, curr: any) => acc + curr.value, 0);

    // Create a new object with the desired properties
    const obj = {
      day: dateObj.getDay(),
      step: Math.floor(stepTotal),
      date: dateString,
      goal: stepGoalHistory[dateString] ?? 0,
    } as IStepHistory;

    result.push(obj);
  });

  result.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return result;
}

function* fetchStep() {
  try {

    const stepToday:HealthValue = yield call(useHealthKit.getStepCount);

    const { value } = stepToday;

    const options: HealthInputOptions = {
      startDate: getDateBefore(7),
      endDate: getDateBefore(1),
    };

    const stepPast7Days:HealthValue[] = yield call(useHealthKit.getDailyStepCount, options);

    const stepHistory: IStepHistory[] = yield call(convertData, stepPast7Days);

    const prepareData: IStepData = {
      stepToday: value,
      stepHistory: stepHistory
    };

    yield put(setStepDataAction(prepareData));

    const defaultStepHistoryData = {};
    const stepGoalHistory:IStepGoalHistory = yield call(StorageService.getItem, STEP_GOAL_HISTORY, defaultStepHistoryData);
    const { latest = 0 } = stepGoalHistory;
    yield put(setStepGoalAction(latest));

  } catch (e) {
    yield put(setStepErrorAction({ message: "Unable to fetch step data" }));
  }
}

function* saveStepGoal(action: IStepAction) {
  yield delay(500); // debounces

  const goal = action.payload;

  const defaultStepHistoryData = {};
  const stepGoalHistory:IStepGoalHistory = yield call(StorageService.getItem, STEP_GOAL_HISTORY, defaultStepHistoryData);

  const dateToday = new Date().toLocaleDateString("en-US");
  Object.assign(stepGoalHistory, {
    latest: goal,
    [dateToday]: goal,
  });

  yield call(StorageService.setItem, STEP_GOAL_HISTORY, stepGoalHistory);
  yield put(setStepGoalAction(goal));
}

function* stepSaga() {
  yield takeEvery(FETCH_STEP, fetchStep);
  yield takeLatest(SAVE_STEP_GOAL, saveStepGoal);
}

export {
  stepSaga
};