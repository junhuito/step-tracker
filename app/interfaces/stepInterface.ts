export interface IStepReducer {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    isLoading: boolean;
    error: IStepError;
    data?: IStepData;
    goal?: number;
}

export interface IStepHistory {
    day: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    step: number;
    date: string;
    goal?: number;
}

export interface IStepData {
    stepToday: number;
    stepHistory: IStepHistory[]; 
}

export interface IStepError {
    message: string
}

export type IStepGoal = number;
  
export interface IStepAction {
    type: string;
    payload?: any;
};

export interface IStepGoalHistory {
    [date: string]: number;
}