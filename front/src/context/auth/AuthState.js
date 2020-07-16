import React, { useReducer } from 'react';
import AuthContext from './authContext';
import {
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT,
	CLEAR_ERRORS
} from '../types';
import axios from 'axios';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';

function AuthState(props) {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		loading: true,
		error: null,
		user: null
	};

	const [state, dispatch] = useReducer(authReducer, initialState);

	// load user
	const loadUser = async () => {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}

		try {
			const res = await axios.get('/api/auth');

			dispatch({ type: USER_LOADED, payload: res.data });
		} catch (err) {
			dispatch({ type: AUTH_ERROR });
		}
	};

	// register user
	const registerUser = async formData => {
		const config = { headers: { 'Content-Type': 'application/json' } };

		try {
			const res = await axios.post('/api/users', formData, config);

			dispatch({ type: REGISTER_SUCCESS, payload: res.data });

			loadUser();
		} catch (err) {
			dispatch({
				type: REGISTER_FAILURE,
				payload: err.response.data.message
			});
		}
	};

	// login user
	const loginUser = async formData => {
		const config = { headers: { 'Content-Type': 'application/json' } };

		try {
			const res = await axios.post('/api/auth', formData, config);

			dispatch({ type: LOGIN_SUCCESS, payload: res.data });

			loadUser();
		} catch (err) {
			console.log(err.response.data.message);
			dispatch({
				type: LOGIN_FAILURE,
				payload: err.response.data.message
			});

			console.log(state.error);
		}
	};
	// logout
	const logoutUser = () => {
		dispatch({ type: LOGOUT });
	};

	// clear errors
	const clearErrors = () => {
		dispatch({ type: CLEAR_ERRORS });
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				error: state.error,
				user: state.user,
				registerUser,
				clearErrors,
				loadUser,
				loginUser,
				logoutUser
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}

export default AuthState;
