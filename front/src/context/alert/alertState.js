import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

function AlertState(props) {
	const initialState = [];

	const [state, dispatch] = useReducer(alertReducer, initialState);

	// set alert
	const setAlert = (msg, timeOut = 5000) => {
		const id = Date.now() + Math.random();

		dispatch({
			type: SET_ALERT,
			payload: { msg, id }
		});

		setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeOut);
	};

	return (
		<AlertContext.Provider
			value={{
				alerts: state,
				setAlert
			}}
		>
			{props.children}
		</AlertContext.Provider>
	);
}

export default AlertState;
