const jwtToken = require('jsonwebtoken');
const keys = require('../config/keys');

const auth = (req, res, next) => {
	// get token from header
	const token = req.header('x-auth-token');
	// check token
	if (!token) {
		return res.status(401).json({ message: 'No token, authorization denied.' });
	}

	try {
		const secret = keys.jwtSecret;
		const decoded = jwtToken.verify(token, secret);
		req.user = decoded.user;
		next();
	} catch (err) {
		return res.status(401).json({ message: 'Token is not valid.' });
	}
};

module.exports = auth;
