import Tasks from './modules/Tasks';
import Task from './modules/Task';

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
];

export default routes;