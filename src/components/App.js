import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
	constructor() {
		super();

		this.addFish = this.addFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		//get initial state
		this.state = {
			fishes: {},
			order: {}
		};
	}

	addFish(fish){
		//update state, first take a copy of state (perf)
		const fishes = {...this.state.fishes};
		//add in new fish with unique id
		const timestamp = Date.now();
		fishes[`fish-${timestamp}`] = fish;

		//set state
		this.setState({fishes: fishes })
	}

	loadSamples(){
		//shouldn't we copy the state here?
		this.setState({
			fishes: sampleFishes
		})
	}

	render(){
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market" />
				</div>
				<Order />
				<Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
			</div>
		) 
	}
}

export default App;
