import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alert = () => {
	const alertContext = useContext(AlertContext);

	return (
		alertContext.alerts.length > 0 &&
		alertContext.alerts.map(alert => (
			<div key={alert.id} className='alert'>
				<p>{alert.msg}</p>
			</div>
		))
	);
};

export default Alert;
