import { SET_STEP_DATA, SET_STEP_ERROR, SET_STEP_GOAL } from '../actions/stepAction';
import { IStepReducer, IStepError, IStepData, IStepAction } from '../../interfaces/stepInterface';

const initialState: IStepReducer = {
    data: {
        stepHistory: [],
        stepToday: 0,
    } as IStepData,
    status: 'idle',
    isLoading: false,
    goal: 0,
    error: {
      message: ""
    } as IStepError,
};

export const stepReducer = (state = initialState, action: IStepAction) => {
    switch(action.type) {
        case SET_STEP_DATA:
            console.log(action.payload);
            return {
                ...state,
                data: action.payload
            }
        case SET_STEP_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case SET_STEP_GOAL:
            return {
                ...state,
                goal: action.payload
            }
        default: return state;
    }
};