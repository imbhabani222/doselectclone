/* eslint-disable generator-star-spacing */
import { call } from "redux-saga/effects";

import actions from "../constants/actions";
import constants from "../constants/constants";
import { getDataFromAPI, setAction } from "../utils/sagas";
import { APIs } from "../utils/workers";

export function* sampleWorker() {
  const reqParams = {
    url: `${APIs.baseURL}ad9fa7d8-f74b-4e42-ab73-8e264293a2af`,
    successAction: actions.SAMPLE_ACTION_SUCCESS,
    errorAction: actions.SAMPLE_ACTION_ERROR
  };

  yield call(getDataFromAPI, reqParams, constants.HTTP_METHODS.GET);
}

export function* actionWorker(data) {
  yield call(setAction, { successAction: actions.ACTIONS_SUCCESS, data });
}
