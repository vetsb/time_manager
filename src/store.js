import {combineReducers, createStore} from "redux";
import tasksReducer from './modules/Tasks/store/reducer';
import taskReducer from './modules/Task/store/reducer';
import executionReducer from './modules/Execution/store/reducer';

const store = createStore(combineReducers({
	tasks: tasksReducer,
	task: taskReducer,
	execution: executionReducer
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;