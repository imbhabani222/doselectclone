import { all, fork } from "redux-saga/effects";

import * as appWatcher from "./watchers/watchers";

function* appRootSaga() {
  yield all([fork(appWatcher.sampleWatcher)]);
  yield all([fork(appWatcher.actionWatcher)]);
}

export default appRootSaga;
