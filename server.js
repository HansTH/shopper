const express = require('express');
const connectDB = require('./config/db');
const server = express();
const path = require('path');

const API_USERS = require('./routes/users');
const API_ITEMS = require('./routes/item');
const API_AUTH = require('./routes/auth');

// connect to DB
connectDB();

// init middleware
server.use(express.json({ extended: false }));

// define API routes
server.use('/api/users', API_USERS);
server.use('/api/items', API_ITEMS);
server.use('/api/auth', API_AUTH);

// create static assets for production
if (process.env.NODE_ENV === 'production') {
	// set static folder
	server.use(express.static('front/build'));

	server.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'front', 'build', 'index.html'))
	);
}

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
	console.log(`server listen on port ${PORT}`);
});
