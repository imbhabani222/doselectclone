import envConfig from "../config/env-urls";

const REACT_APP_ENV = process.env.REACT_APP_ENV;
export const APIs = envConfig[REACT_APP_ENV].API;
