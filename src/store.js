import {combineReducers, createStore} from "redux";
import tasksReducer from './modules/Tasks/reducer';
import taskReducer from './modules/Task/reducer';

const store = createStore(combineReducers({
	tasks: tasksReducer,
	task: taskReducer
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;