const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	},
	itemName: {
		type: String,
		required: true
	},
	completed: {
		type: Boolean,
		default: false
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('item', ItemSchema);
