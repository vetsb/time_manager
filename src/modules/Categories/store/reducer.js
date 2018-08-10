import * as types from './actionTypes';

export default (state = [], action) => {
	switch(action.type) {
		case types.FETCH_CATEGORIES_RESULT:
			return action.categories;

		case types.DELETE_CATEGORY:
			return state.filter(item => item.id !== action.id);

		case types.ADD_CATEGORY_RESULT:
			return [
				...state,
				action.category,
			];

		case types.EDIT_CATEGORY_RESULT:
			const category = action.category;
			let tmpState = [...state];

			Object.assign(tmpState[state.findIndex(item => item.id === category.id)], category);

			return tmpState;

		case types.FETCH_CATEGORIES:
		case types.DELETE_CATEGORIES:
		case types.ADD_CATEGORY:
		case types.EDIT_CATEGORY:
		default:
			return state;
	}
};