import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import ShoppingListContext from '../../context/shopping/shoppingListContext';
import authContext from '../../context/auth/authContext';

function Navbar() {
	const [newItem, setNewItem] = useState({ itemName: '' });
	const { newShoppingItem, clearShoppingList } = useContext(
		ShoppingListContext
	);

	const { isAuthenticated, user, logoutUser } = useContext(authContext);

	const handleNewShoppingItem = (event, item) => {
		event.preventDefault();
		newShoppingItem(item);
		setNewItem({ itemName: '' });
	};

	const onChange = e => {
		setNewItem({ ...newItem, [e.target.name]: e.target.value });
	};

	const onLogout = () => {
		logoutUser();
		clearShoppingList();
	};

	const links = !isAuthenticated ? (
		<>
			<li>
				<Link to='/api/users'>Register</Link>
			</li>
			<li>
				<Link to='/api/auth'>Login</Link>
			</li>
		</>
	) : (
		<>
			<li>
				<Link to='/' onClick={onLogout}>
					Logout
				</Link>
			</li>
		</>
	);

	return (
		<div className='navbar'>
			<div className='container'>
				<nav>
					{user && <p>{`Welcome ${user.name}`}</p>}
					<ul>{links}</ul>
				</nav>
			</div>
			{isAuthenticated ? (
				<form className='container'>
					<input
						type='text'
						name='itemName'
						placeholder='Add new item'
						value={newItem.itemName}
						onChange={onChange}
					/>
					<button
						onClick={event => handleNewShoppingItem(event, newItem)}
						disabled={newItem.itemName === ''}
					></button>
				</form>
			) : null}
		</div>
	);
}

export default Navbar;
