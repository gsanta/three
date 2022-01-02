import ActionTypes from './actionTypes';

export interface EngineReducerState {
  isLoaded: boolean;
}

const initialState: EngineReducerState = {
  isLoaded: false,
};

const reducer = (state = initialState, action: any = undefined): EngineReducerState => {
  switch (action.type) {
    case ActionTypes.engineLoaded:
      return { ...state, isLoaded: true };
    default:
      return { ...state };
  }
};

export default reducer;
