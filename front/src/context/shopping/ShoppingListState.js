import React, { useReducer } from 'react';
import axios from 'axios';
import ShoppingListContext from './shoppingListContext';
import shoppingListReducer from './shoppingListReducer';
import {
	GET_SHOPPING_LIST,
	CLEAR_SHOPPING_LIST,
	NEW_SHOPPING_ITEM,
	DELETE_SHOPPING_ITEM,
	EDIT_SHOPPING_ITEM,
	CANCEL_UPDATE_ITEM,
	UPDATE_SHOPPING_ITEM,
	IS_MODAL_OPEN,
	SHOPPING_ITEM_ERROR,
	CLEAR_ERRORS
} from '../types';

function ShoppingListState(props) {
	const initialState = {
		shoppingList: [],
		isModalOpem: false,
		shoppingListItem: {},
		error: null
	};

	const [state, dispatch] = useReducer(shoppingListReducer, initialState);

	const getShoppingList = async () => {
		const res = await axios.get('/api/items');
		try {
			dispatch({
				type: GET_SHOPPING_LIST,
				payload: res.data
			});
		} catch (err) {
			dispatch({
				type: SHOPPING_ITEM_ERROR,
				payload: err.response.data.message
			});
		}
	};

	const clearShoppingList = () => {
		dispatch({
			type: CLEAR_SHOPPING_LIST
		});
	};

	const newShoppingItem = async item => {
		const config = { headers: { 'Content-Type': 'application/json' } };

		try {
			const res = await axios.post('/api/items', item, config);

			dispatch({
				type: NEW_SHOPPING_ITEM,
				payload: res.data.newItem
			});
		} catch (err) {
			dispatch({
				type: SHOPPING_ITEM_ERROR,
				payload: err.response.data.message
			});
		}
	};

	const toogleCompleet = async toogleItem => {
		const { _id, itemName } = toogleItem;
		const updateItem = {
			completed: !toogleItem.completed,
			_id,
			itemName
		};

		const config = { headers: { 'Content-Type': 'application/json' } };

		try {
			const res = await axios.put(
				`/api/items/${updateItem._id}`,
				updateItem,
				config
			);

			dispatch({
				type: UPDATE_SHOPPING_ITEM,
				payload: res.data
			});
		} catch (err) {
			dispatch({
				type: SHOPPING_ITEM_ERROR,
				payload: err.response.data.message
			});
		}
	};

	const deleteShoppingItem = async id => {
		try {
			const res = await axios.delete(`/api/items/${id}`);

			const message = res.data.message;
			dispatch({
				type: DELETE_SHOPPING_ITEM,
				payload: { id, message }
			});
		} catch (err) {
			dispatch({
				type: SHOPPING_ITEM_ERROR,
				payload: err.response.data.message
			});
		}
	};

	const editShoppingItem = item => {
		dispatch({
			type: EDIT_SHOPPING_ITEM,
			payload: item
		});
	};

	const cancelUpdateItem = () => {
		dispatch({
			type: CANCEL_UPDATE_ITEM
		});
	};

	const updateShoppingItem = async updateItem => {
		const config = { headers: { 'Content-Type': 'application/json' } };

		try {
			const res = await axios.put(
				`/api/items/${updateItem._id}`,
				updateItem,
				config
			);

			dispatch({
				type: UPDATE_SHOPPING_ITEM,
				payload: res.data
			});
		} catch (err) {
			dispatch({
				type: SHOPPING_ITEM_ERROR,
				payload: err.response.data.message
			});
		}
	};

	const openCloseModal = isOpen => {
		dispatch({
			type: IS_MODAL_OPEN,
			payload: isOpen
		});
	};

	const clearErrors = () => {
		dispatch({
			type: CLEAR_ERRORS
		});
	};

	return (
		<ShoppingListContext.Provider
			value={{
				shoppingList: state.shoppingList,
				isModalOpen: state.isModalOpen,
				shoppingListItem: state.shoppingListItem,
				error: state.error,
				getShoppingList,
				newShoppingItem,
				toogleCompleet,
				deleteShoppingItem,
				editShoppingItem,
				cancelUpdateItem,
				updateShoppingItem,
				openCloseModal,
				clearErrors,
				clearShoppingList
			}}
		>
			{props.children}
		</ShoppingListContext.Provider>
	);
}

export default ShoppingListState;
