import mediaRunningReducer from "./mediaRunning/mediaRunning";
import homeReducer from "./home/home";
import auctionReducer from "./auction/auction";

const rootReducers = {
  mediaRunning: mediaRunningReducer,
  home: homeReducer,
  auction: auctionReducer
};

export default rootReducers;
