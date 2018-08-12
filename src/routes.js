import Tasks from './modules/Tasks';
import Task from './modules/Task';
import Execution from './modules/Execution';
import Categories from './modules/Categories';
import Category from './modules/Category';

const routes = [
	{
		path: "/",
		component: Tasks,
		isExact: true,
	},
	{
		path: "/categories",
		component: Categories,
		isExact: true,
	},
	{
		path: "/categories/:id",
		component: Category,
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