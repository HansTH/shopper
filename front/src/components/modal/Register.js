import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import shoppingListContext from '../../context/shopping/shoppingListContext';
import alertContext from '../../context/alert/alertContext';
import authContext from '../../context/auth/authContext';
import Alert from './Alert';

function Register(props) {
	const [register, setRegister] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});

	const { cancelUpdateItem } = useContext(shoppingListContext);
	const { setAlert } = useContext(alertContext);
	const { registerUser, error, clearErrors, isAuthenticated } = useContext(
		authContext
	);

	useEffect(() => {
		if (isAuthenticated) {
			props.history.push('/');
		}
		if (error === 'User already exists') {
			setAlert(error);
			clearErrors();
		}

		// eslint-disable-next-line
	}, [error, isAuthenticated, props.history]);

	const onChange = e => {
		setRegister({ ...register, [e.target.name]: e.target.value });
	};

	const onRegister = e => {
		e.preventDefault();

		if (
			register.name === '' &&
			register.email === '' &&
			register.password === '' &&
			register.password2 === ''
		) {
			setAlert('All fields is required.');
		} else if (register.name === '') {
			setAlert('Name is required.');
		} else if (register.email === '') {
			setAlert('Email is required.');
		} else if (register.password === '') {
			setAlert('Password is required.');
		} else if (register.password2 === '') {
			setAlert('Conform password.');
		} else if (register.password !== register.password2) {
			setAlert("Passwords don't match");
		} else {
			registerUser({
				name: register.name,
				email: register.email,
				password: register.password
			});
		}
	};

	return (
		<div className='overlay'>
			<div className='modal'>
				<Alert />
				<form className='modal-form'>
					<h1>Register</h1>
					<label htmlFor='name'>Name</label>
					<input
						type='text'
						id='name'
						name='name'
						value={register.name}
						onChange={onChange}
					/>
					<label htmlFor='email'>Email</label>
					<input
						type='text'
						id='email'
						name='email'
						value={register.email}
						onChange={onChange}
					/>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						name='password'
						value={register.password}
						onChange={onChange}
					/>
					<label htmlFor='password2'>Confirm Password</label>
					<input
						type='password'
						id='password2'
						name='password2'
						value={register.password2}
						onChange={onChange}
					/>
					<div className='modal-buttons'>
						<button type='submit' onClick={e => onRegister(e)}>
							Register
						</button>
						<Link to='/'>
							<button type='button' onClick={() => cancelUpdateItem()}>
								Cancel
							</button>
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Register;
