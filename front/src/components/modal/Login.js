import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ShoppingListContext from '../../context/shopping/shoppingListContext';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import Alert from './Alert';

function Login(props) {
	const [login, setLogin] = useState({
		email: '',
		password: ''
	});

	const { cancelUpdateItem } = useContext(ShoppingListContext);

	const { setAlert } = useContext(AlertContext);
	const { loginUser, error, clearErrors, isAuthenticated } = useContext(
		AuthContext
	);

	const onChange = e => {
		e.preventDefault();
		setLogin({ ...login, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		if (isAuthenticated) {
			props.history.push('/');
		}

		if (error === 'Invalid credentials') {
			setAlert(error);
			clearErrors();
		}

		// eslint-disable-next-line
	}, [isAuthenticated, error, props.history]);

	const onLogin = e => {
		e.preventDefault();

		if (login.email === '' && login.password === '') {
			setAlert('Email and Password is required.');
		} else if (login.email === '') {
			setAlert('Email is required.');
		} else if (login.password === '') {
			setAlert('Password is required.');
		} else {
			loginUser({
				email: login.email,
				password: login.password
			});
		}
	};

	return (
		<div className='overlay'>
			<div className='modal'>
				<Alert />
				<form className='modal-form'>
					<h1>Login</h1>
					<label htmlFor='email'>Email</label>
					<input
						type='text'
						id='email'
						name='email'
						value={login.email}
						onChange={onChange}
					/>
					<label htmlFor='email'>Password</label>
					<input
						type='password'
						id='password'
						name='password'
						value={login.password}
						onChange={onChange}
					/>
					<div className='modal-buttons'>
						<button type='submit' onClick={e => onLogin(e)}>
							Login
						</button>
						<Link to='/'>
							<button type='button' onClick={cancelUpdateItem}>
								Cancel
							</button>
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
