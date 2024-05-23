/* eslint-disable no-prototype-builtins */
export const createReducer = (initialState, handlers) => {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
};

export const getFetchingState = (state) => ({
  ...state,
  fetching: true,
  result: null,
  error: null
});

export const getSuccessState = (state, { result }) => ({
  ...state,
  fetching: false,
  result: result.result || result,
  error: null
});

export const getErrorState = (state, { error }) => ({
  ...state,
  fetching: false,
  result: null,
  error
});

export const getResetState = (state) => ({
  ...state,
  fetching: false,
  result: null,
  error: null
});

export const getActionInitialState = (state) => ({
  ...state
});

export const getActionDefaultState = (state, { result: { data } }) => ({
  ...state,
  ...data
});
