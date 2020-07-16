import React from 'react';
import uncheckedIcon from '../assets/img/unchecked.png';
import checkedIcon from '../assets/img/checked.png';
import editIcon from '../assets/img/edit.png';
import deleteIcon from '../assets/img/delete.png';

const About = () => {
	return (
		<div className='shopping-list'>
			<h2>Shopping list</h2>
			<h4>Login or Register for creating a shoppinglist.</h4>
			<p>
				Add shopping items to your list by using the input field in the
				navigation bar. When you have the shopping item in your trolley, you can
				tap the <img className='icon' src={uncheckedIcon} alt='unchecked' />{' '}
				button for completion. The item will move to the complete list.
			</p>
			<p>
				If you need an item again, you can tap{' '}
				<img className='icon' src={checkedIcon} alt='checked' /> button to move
				it back to the shopping list. In the shopping list, you can tap the{' '}
				<img className='icon' src={editIcon} alt='edit' /> button to edit the
				item. Or tap the <img className='icon' src={deleteIcon} alt='delete' />{' '}
				button to remove the shopping item.
			</p>
		</div>
	);
};

export default About;
