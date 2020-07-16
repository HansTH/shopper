import React, { useState, useContext } from 'react';
import ShoppingListContext from '../../context/shopping/shoppingListContext';

function Edit() {
	const { shoppingListItem, cancelUpdateItem, updateShoppingItem } = useContext(
		ShoppingListContext
	);
	const [updateItem, setUpdateItem] = useState(shoppingListItem);

	const handleUpdateShoppingItem = (e, updateItem) => {
		e.preventDefault();
		updateShoppingItem(updateItem);

		cancelUpdateItem();
	};

	return (
		<div className='overlay'>
			<div className='modal'>
				<form className='modal-form'>
					<h1>Edit item</h1>
					<input
						type='text'
						value={updateItem.itemName}
						onChange={e => {
							setUpdateItem({
								_id: shoppingListItem._id,
								itemName: e.target.value,
								completed: shoppingListItem.completed
							});
						}}
					/>
					<div className='modal-buttons'>
						<button
							type='submit'
							onClick={e => handleUpdateShoppingItem(e, updateItem)}
						>
							Update
						</button>
						<button type='button' onClick={cancelUpdateItem}>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Edit;
