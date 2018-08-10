import * as types from './actionTypes';
import store from '../../../store';
import Api from "../../../utils/Api";

export const fetchCategories = () => {
	new Api("categories", {}, {}, json => {
		store.dispatch(fetchCategoriesResult(json))
	});

	return {
		type: types.FETCH_CATEGORIES
	};
};

export const fetchCategoriesResult = (categories) =>  {
	return {
		type: types.FETCH_CATEGORIES_RESULT,
		categories: categories
	};
};


export const editCategory = (category) => {
	new Api('categories/' + category.id, {}, {
		method: "PATCH",
		headers: {
			'Accept': 'application/json',
			"Content-Type": "application/json"
		},
		body: JSON.stringify(category),
	}, () => {
		store.dispatch(editCategoryResult(category));
	});

	return {
		type: types.EDIT_CATEGORY
	}
};

export const editCategoryResult = (category) => {
	return {
		type: types.EDIT_CATEGORY_RESULT,
		category: category,
	}
};

export const deleteCategories = (ids) =>  {
	ids.forEach(id => {
		new Api("categories/" + id, {}, {
			method: "DELETE"
		}, () => {
			store.dispatch(deleteCategory(id))
		});
	});

	return {
		type: types.DELETE_CATEGORIES
	};
};

export const deleteCategory = (id) =>  {
	return {
		type: types.DELETE_CATEGORY,
		id: id
	};
};

export const addCategory = (category) =>  {
	new Api("categories", {}, {
		method: "POST",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(category)
	}, json => {
		store.dispatch(addCategoryResult(json))
	});

	return {
		type: types.ADD_CATEGORY
	};
};

export const addCategoryResult = (category) =>  {
	return {
		type: types.ADD_CATEGORY_RESULT,
		category: category
	};
};