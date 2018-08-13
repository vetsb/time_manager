import Tasks from './modules/Tasks';
import Task from './modules/Task';
import Execution from './modules/Execution';
import Categories from './modules/Categories';

const routes = [
	{
		path: "/",
		component: Tasks,
		isExact: true,
	},
	{
		path: "/:id",
		component: Task,
		isExact: true,
	},
	{
		path: "/:id/run",
		component: Execution,
		isExact: true,
	},
];

export default routes;