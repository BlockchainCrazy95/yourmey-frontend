import mediaRunningReducer from "./mediaRunning/mediaRunning";
import homeReducer from "./home/home";

const rootReducers = {
  mediaRunning: mediaRunningReducer,
  home: homeReducer
};

export default rootReducers;
