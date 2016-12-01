import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
	// constructor() {
	// 	super();
	// 	this.goToStore = this.goToStore.bind(this);
	// }

	goToStore(event){
		event.preventDefault();
		// grab text from box
		const value = this.storeInput.value;
		console.log(value);
		// second go to store/storeID
	}

	render(){
		return (
			/* old school {this.goToStore.bind(this)}*/
			<form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
				{/* HTML Comment */}
				<h2>Please Enter a Store</h2>
				<input type="text" required placeholder="Store Name" 
					defaultValue={getFunName()} 
					ref={(input) => {this.storeInput = input} } />
				<button type="submit">Visit Store -></button>
			</form>
		) 
	}
}

export default StorePicker;
