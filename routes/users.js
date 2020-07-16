const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const keys = require('../config/keys');
const jwtToken = require('jsonwebtoken');

/*
  @method    POST api/users
  @desc      register user
  @access    public
*/
router.post(
	'/',
	[
		body('name', 'Please add a name.').not().isEmpty(),
		body('email', 'Please include a valid email.').isEmail(),
		body(
			'password',
			'Please enter a password with 5 or more character.'
		).isLength({
			min: 5
		})
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({ message: 'User already exists' });
			}

			user = new User({
				name,
				email,
				password
			});

			// generate a salt
			const salt = await bcrypt.genSalt(10);
			// generate a hash
			user.password = await bcrypt.hash(password, salt);

			await user.save();

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
