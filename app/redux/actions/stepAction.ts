import { IStepData, IStepError, IStepGoal } from 'app/interfaces/stepInterface';

export const FETCH_STEP = "FETCH_STEP";
export const SET_STEP_DATA = "SET_STEP_DATA";
export const SET_STEP_ERROR = "SET_STEP_ERROR";
export const SET_STEP_GOAL = "SET_STEP_GOAL";
export const SAVE_STEP_GOAL = "SAVE_STEP_GOAL";

export const fetchStepAction = () => ({
    type: FETCH_STEP,
});

export const setStepDataAction = (payload:IStepData) => ({
    type: SET_STEP_DATA,
    payload
});

export const setStepErrorAction = (payload:IStepError) => ({
    type: SET_STEP_ERROR,
    payload
});

export const setStepGoalAction = (payload:IStepGoal) => ({
    type: SET_STEP_GOAL,
    payload
});

export const saveStepGoalAction = (payload:IStepGoal) => ({
    type: SAVE_STEP_GOAL,
    payload
});
