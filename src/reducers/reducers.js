import { combineReducers } from "redux";

import actions from "../constants/actions";

import {
  getFetchingState,
  getSuccessState,
  getErrorState,
  getResetState,
  createReducer,
  getActionDefaultState,
  getActionInitialState
} from "../utils/reducers";

import { defaultState, actionsDefaultState } from "./config";

const sampleReducer = createReducer(defaultState, {
  [actions.SAMPLE_ACTION]: getFetchingState,
  [actions.SAMPLE_ACTION_SUCCESS]: getSuccessState,
  [actions.SAMPLE_ACTION_ERROR]: getErrorState,
  [actions.CLEAR_SAMPLE_ACTION]: getResetState
});

const actionReducer = createReducer(actionsDefaultState, {
  [actions.ACTIONS]: getActionInitialState,
  [actions.ACTIONS_SUCCESS]: getActionDefaultState
});

export default combineReducers({
  sampleReducer,
  actionReducer
});
