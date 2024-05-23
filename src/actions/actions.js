import actions from "../constants/actions";

export const sampleAction = () => ({
  type: actions.SAMPLE_ACTION
});

export const systemActions = (data) => ({
  type: actions.ACTIONS,
  data
});
