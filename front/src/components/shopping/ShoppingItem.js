import React, { useContext } from 'react';
import editIcon from '../../assets/img/edit.png';
import uncheckedIcon from '../../assets/img/unchecked.png';
import checkedIcon from '../../assets/img/checked.png';
import deleteIcon from '../../assets/img/delete.png';
import ShoppingListContext from '../../context/shopping/shoppingListContext';

function ShoppingItem(props) {
	const { completed, itemName, _id } = props.item;
	const { toogleCompleet, deleteShoppingItem, editShoppingItem } = useContext(
		ShoppingListContext
	);

	function capitalize(text) {
		const firstLetter = text.slice(0, 1).toUpperCase();
		const restWord = text.slice(1).toLowerCase();
		return firstLetter + restWord;
	}

	return (
		<div className='shopping-item'>
			<p>{capitalize(itemName)}</p>
			<div className='buttons'>
				<button type='button' onClick={() => toogleCompleet(props.item)}>
					<img src={completed ? checkedIcon : uncheckedIcon} alt='unchecked' />
				</button>
				<div className='seperator'></div>
				<button
					type='button'
					onClick={
						completed
							? () => deleteShoppingItem(_id)
							: () => editShoppingItem(props.item)
					}
				>
					<img src={completed ? deleteIcon : editIcon} alt='edit' />
				</button>
			</div>
		</div>
	);
}

export default ShoppingItem;
