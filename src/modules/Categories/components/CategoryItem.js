import React from 'react';
import MListItem from "../../../components/MListItem/index";

const CategoryItem = (props) => {
	const {item} = props;

	return (
		<MListItem
			id={item.id}
			primaryText={item.title}
			{...props}/>
	)
};

export default CategoryItem;