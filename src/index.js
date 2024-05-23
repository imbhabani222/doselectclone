import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import identity from "lodash/identity";

import appReducers from "./root-reducers";
import appRootSaga from "./sagas";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ScrollToTop from "./utils/scroll-to-top";

const sagaMiddleware = createSagaMiddleware();

const createStoreWithMiddleware = compose(
  applyMiddleware(sagaMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : identity
)(createStore);

const store = createStoreWithMiddleware(appReducers, {});

sagaMiddleware.run(appRootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
