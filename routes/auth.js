const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const keys = require('../config/keys');
const jwtToken = require('jsonwebtoken');
const auth = require('../middleware/auth');

/*
  @method    GET api/auth
  @desc      get logged in user
  @access    private
*/
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		return res.status(500).json({ message: 'Server error.' });
	}
});

/*
  @method    POST api/auth
  @desc      auth user and get token
  @access    public
*/
router.post(
	'/',
	[
		body('email', 'Please use a valid email').isEmail(),
		body('password', 'Password is required').exists()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ message: 'Invalid credentials' });
			}

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res.status(400).json({ message: 'Invalid credentials' });
			}

			// create jwtToken
			const payload = { user: { id: user.id } };
			const secret = keys.jwtSecret;
			jwtToken.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
				if (err) throw err;
				res.json({ token });
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
