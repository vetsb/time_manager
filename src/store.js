import {combineReducers, createStore} from "redux";
import tasksReducer from './modules/Tasks/reducer';

const store = createStore(combineReducers({
	tasks: tasksReducer
}));

export default store;