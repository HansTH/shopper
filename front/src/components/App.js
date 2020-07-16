import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ShoppingList from './shopping/ShoppingList';
import Navbar from './navbar/Navbar';
import ShoppingListState from '../context/shopping/ShoppingListState';
import AlertState from '../context/alert/alertState';
import AuthState from '../context/auth/AuthState';
import Register from './modal/Register';
import Login from './modal/Login';
import setAuthToken from '../utils/setAuthToken';
import PrivateRoute from './routing/PrivateRoute';
import About from './About';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	return (
		<div className='app'>
			<AuthState>
				<ShoppingListState>
					<AlertState>
						<BrowserRouter>
							<Navbar />
							<Switch>
								<PrivateRoute exact path='/' component={ShoppingList} />
								<Route path='/api/users' component={Register} />
								<Route path='/api/auth' component={Login} />
								<Route path='/about' component={About} />
							</Switch>
						</BrowserRouter>
					</AlertState>
				</ShoppingListState>
			</AuthState>
		</div>
	);
};

export default App;
