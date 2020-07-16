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
		loading
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

	return (
		<div className='shopping-list'>
			<Alert />

			{shoppingList.length === 0 ? (
				<div style={{ textAlign: 'center' }}>
					<p>No items found, add new items.</p>
					{!loading && <Spinner />}
				</div>
			) : (
				shoppingList.map(item =>
					!item.completed ? <ShoppingItem key={item._id} item={item} /> : null
				)
			)}
			{shoppingList.length > 0 ? (
				<div className='horizontal-seperator'></div>
			) : null}
			{shoppingList.length !== 0 &&
				shoppingList.map(item =>
					item.completed ? <ShoppingItem key={item._id} item={item} /> : null
				)}
			{isModalOpen && <Edit />}
		</div>
	);
}

export default ShoppingList;
