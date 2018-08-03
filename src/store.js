import {combineReducers, createStore} from "redux";
import tasksReducer from './modules/Tasks/reducer';
import taskReducer from './modules/Task/reducer';
import executionReducer from './modules/Execution/reducer';

const store = createStore(combineReducers({
	tasks: tasksReducer,
	task: taskReducer,
	execution: executionReducer
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;