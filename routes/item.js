const express = require('express');
const router = express.Router();
const Item = require('../models/ShoppingItem');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

/*
  @method    GET api/items
  @desc      get all user items
	@access    private
	
*/
router.get('/', auth, async (req, res) => {
	try {
		const items = await Item.find({ user: req.user.id }).sort({ date: -1 });
		res.json(items);
	} catch (err) {
		return res.status(500).json({ message: 'Server error.' });
	}
});

/*
  @method    POST api/items
  @desc      add new item
  @access     private
*/
router.post(
	'/',
	auth,
	// form validation
	[body('itemName', 'Add a item').not().isEmpty()],
	async (req, res) => {
		// checking for form validation
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const { itemName } = req.body;
			const shoppingItem = itemName.toLowerCase();
			// check if item already exists by the user
			const item = await Item.find({ user: req.user.id }).findOne({
				itemName: shoppingItem
			});

			if (item && item.user.toString() === req.user.id) {
				return res.status(400).json({ message: 'Item already exists' });
			}
			// create new item
			let newItem = new Item({
				itemName: shoppingItem,
				user: req.user.id
			});

			// save item to the DataBase
			await newItem.save();

			// return the new item
			res.json({ newItem });
		} catch (err) {
			return res.status(500).json({ message: 'Server error.' });
		}
	}
);

/*
  @method    PUT api/items/:id
  @desc      update item by id
  @access    private
*/
router.put('/:id', auth, async (req, res) => {
	// destrucing the value out of the req object
	const { itemName, completed } = req.body;
	const id = req.params.id;

	// create a new update item
	let updateItem = {};
	if (itemName) updateItem.itemName = itemName.toLowerCase();
	if (!completed || completed) updateItem.completed = completed;

	try {
		// find item by id
		let item = await Item.findById(id);
		if (!item) return res.status(404).jason({ message: 'Item not found.' });

		// check if user owns the item
		if (item.user.toString() !== req.user.id) {
			return res.status(401).json({ message: 'Not authorized.' });
		}

		// update the item in the DataBase by id
		item = await Item.findByIdAndUpdate(
			id,
			{ $set: updateItem },
			{ new: true }
		);

		// return the updated item
		res.json(item);
	} catch (err) {
		return res.status(500).json({ message: 'Server error.' });
	}
});

/*
  @method    DELETE api/items/:id
  @desc      delete item by id
  @access    private
*/
router.delete('/:id', auth, async (req, res) => {
	const id = req.params.id;

	try {
		// find item by id
		const item = await Item.findById(id);
		if (!item) return res.status(404).json({ message: 'Item not found.' });

		// prevent deleting item by other user
		if (item.user.toString() !== req.user.id) {
			return res.status(401).json({ message: 'Not authorized.' });
		}

		// remove item from DataBase
		await Item.findByIdAndRemove(id);
		res.json({ message: 'Item removed from database' });
	} catch (err) {
		return res.status(500).json({ message: 'Server error.' });
	}
});

module.exports = router;
