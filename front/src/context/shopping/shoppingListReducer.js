import {
	NEW_SHOPPING_ITEM,
	GET_SHOPPING_LIST,
	TOOGLE_COMPLETE,
	DELETE_SHOPPING_ITEM,
	IS_MODAL_OPEN,
	EDIT_SHOPPING_ITEM,
	UPDATE_SHOPPING_ITEM,
	CANCEL_UPDATE_ITEM,
	SHOPPING_ITEM_ERROR,
	CLEAR_ERRORS,
	CLEAR_SHOPPING_LIST
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case GET_SHOPPING_LIST:
			return {
				...state,
				shoppingList: action.payload,
				loading: false
			};

		case NEW_SHOPPING_ITEM:
			return {
				...state,
				shoppingList: [action.payload, ...state.shoppingList],
				loading: false
			};

		case TOOGLE_COMPLETE:
			return {
				...state,
				shoppingList: action.payload
			};

		case DELETE_SHOPPING_ITEM:
			return {
				...state,
				shoppingList: state.shoppingList.filter(
					item => item._id !== action.payload
				),
				loading: false,
				error: action.payload.message
			};

		case IS_MODAL_OPEN:
			return {
				...state,
				isModalOpen: action.payload
			};

		case EDIT_SHOPPING_ITEM:
			return {
				...state,
				isModalOpen: true,
				shoppingListItem: action.payload,
				loading: false
			};

		case UPDATE_SHOPPING_ITEM:
			return {
				...state,
				shoppingList: state.shoppingList.map(item =>
					item._id === action.payload._id ? action.payload : item
				),
				loading: false
			};

		case CANCEL_UPDATE_ITEM:
			return {
				...state,
				shoppingListItem: {},
				isModalOpen: false
			};

		case SHOPPING_ITEM_ERROR:
			return {
				...state,
				error: action.payload
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			};

		case CLEAR_SHOPPING_LIST:
			return {
				...state,
				shoppingList: [],
				shoppingListItem: null,
				error: null
			};

		default:
			return state;
	}
};
