import { createStore , applyMiddleware } from "redux";
import rootReducer from "../reducers/index";
import {duplicateDevice} from "../middleware/index";

const store = createStore(rootReducer, applyMiddleware(duplicateDevice));

export default store;