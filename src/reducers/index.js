import dataReducer from "./dataReducer";
import gameReducer from "./gameReducer";
import scoreReducer from "./scoreReducer";
import markersHistoryReducer from "./markersHistoryReducer";
import randomCapitalReducer from "./randomCapitalReducer";
import highScoreReducer from "./highScoreReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  dataReducer,
  gameReducer,
  randomCapitalReducer,
  scoreReducer,
  markersHistoryReducer,
  highScoreReducer,
});

export default rootReducer;
