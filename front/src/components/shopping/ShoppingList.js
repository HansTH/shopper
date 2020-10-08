import React, { useEffect, useContext } from 'react';
import ShoppingItem from './ShoppingItem';
import Edit from '../modal/Edit';
import ShoppingListContext from '../../context/shopping/shoppingListContext';
import authContext from '../../context/auth/authContext';
import alertContext from '../../context/alert/alertContext';
import Alert from '../modal/Alert';
import Spinner from '../modal/Spinner';

function ShoppingList() {
	const shoppingListContext = useContext(ShoppingListContext);
	const {
		getShoppingList,
		shoppingList,
		isModalOpen,
		error,
		clearErrors,
		loading,
	} = shoppingListContext;
	const { loadUser } = useContext(authContext);
	const { setAlert } = useContext(alertContext);

	useEffect(() => {
		loadUser();

		if (error === 'Item already exists') {
			setAlert(error);
			clearErrors();
		}

		if (error === 'Item removed from database') {
			setAlert(error);
			clearErrors();
		}

		getShoppingList();

		// eslint-disable-next-line
	}, [error]);

	const sortedShoppingList = Object.values(shoppingList).sort(
		(a, b) => b.itemName < a.itemName
	);

	return (
		<div className='shopping-list'>
			<Alert />
			{/* if shoppinglist is empty, show message */}
			{sortedShoppingList.length === 0 ? (
				<div style={{ textAlign: 'center' }}>
					<p>No items found, add new items.</p>
					{!loading && <Spinner />}
				</div>
			) : (
				// show shoppinglis items, are not completed
				sortedShoppingList.map((item) =>
					!item.completed ? <ShoppingItem key={item._id} item={item} /> : null
				)
			)}
			{/* if shoppinglist is empty, don't show seperator line */}
			{sortedShoppingList.length > 0 ? (
				<div className='horizontal-seperator'></div>
			) : null}
			{/* show shoppingist items, are compeleted */}
			{sortedShoppingList.length !== 0 &&
				sortedShoppingList.map((item) =>
					item.completed ? <ShoppingItem key={item._id} item={item} /> : null
				)}
			{/* show modal window */}
			{isModalOpen && <Edit />}
		</div>
	);
}

export default ShoppingList;
