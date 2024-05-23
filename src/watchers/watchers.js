import { takeLatest } from "redux-saga/effects";

import { createWatcher } from "../utils/sagas";
import actions from "../constants/actions";

import * as worker from "../workers/workers";

export const sampleWatcher = createWatcher(actions.SAMPLE_ACTION, worker.sampleWorker, takeLatest);
export const actionWatcher = createWatcher(actions.ACTIONS, worker.actionWorker, takeLatest);
