import React from "react";
import AddFishForm from "./AddFishForm";

class Inventory extends React.Component {
	constructor() {
		super();
		this.renderInventory = this.renderInventory.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e, key){
		const { fishes, updateFish } = this.props;
		const fish = fishes[key];
		const updatedFish = {...fish, 
			// dyanamic way to get what input is beeing changed based on the target.name 
			[e.target.name]: e.target.value
		}

		//app method
		updateFish(key, updatedFish);
	}

	renderInventory(key){
		const { fishes, removeFish } = this.props;
		const fish = fishes[key];

		return (
			<div className="fish-edit" key={key}>
				<input type="text" name="name" value={fish.name} placeholder="Fish name" onChange={(e) => this.handleChange(e, key)}/>
				<input type="text" name="price" value={fish.price} placeholder="Fish price" onChange={(e) => this.handleChange(e, key)}/>
				<select name="status" value={fish.status} onChange={(e) => this.handleChange(e, key)}>
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold Out!</option>
				</select>
				<textarea type="text" name="desc" value={fish.desc} placeholder="Fish desc" onChange={(e) => this.handleChange(e, key)} />
				<input type="text" name="image" value={fish.image} placeholder="Fish image" onChange={(e) => this.handleChange(e, key)}/>
				<button onClick={() => removeFish(key)}>Remove Fish</button>
			</div>
		);
	}

	render() {
		const { fishes } = this.props;
		return (
			<div>
				<h2>Inventory</h2>
				{Object.keys(fishes).map(this.renderInventory) }
				<AddFishForm addFish={this.props.addFish}/>
				<button onClick={this.props.loadSamples}>Load Sample Fishes</button>
			</div>
		)
	}
}


Inventory.propTypes = {
	fishes: React.PropTypes.object.isRequired,
	updateFish: React.PropTypes.func.isRequired,
	removeFish: React.PropTypes.func.isRequired,
	addFish: React.PropTypes.func.isRequired,
	loadSamples: React.PropTypes.func.isRequired
}

export default Inventory;