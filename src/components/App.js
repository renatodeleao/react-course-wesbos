import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
	constructor() {
		super();

		this.addFish = this.addFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.addToOrder = this.addToOrder.bind(this);
		//get initial state
		this.state = {
			fishes: {},
			order: {}
		};
	}

	componentWillMount() {
		//right before <App /> rendered
		this.ref= base.syncState(`${this.props.params.storeId}/fishes`, {
			context: this,
			state: 'fishes'
		});

		//check if order in LS
		const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
		if(localStorageRef){
			//updated app Component order state
			this.setState({
				order: JSON.parse(localStorageRef)
			});
		}
	}

	componentWillUpdate(nextProps, nextState) {
		// console.log("something Changed");
		// console.log({nextProps, nextState})
		localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order))
	}

	//remove events when change store
	componentWillUnmount() {
		base.removeBinding(this.ref);
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

	addToOrder(key) {
		const order = {...this.state.order};
		// updater or add fishes
		order[key] = order[key] + 1 || 1;

		//Update state
		this.setState({
			order: order
		})
	}

	render(){
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market" />
					<ul className="list-of-fishes">
						{
							Object
								.keys(this.state.fishes)
								.map(key => <Fish key={key}
												  index={key} 
												  details={this.state.fishes[key]}  
												  addToOrder={this.addToOrder} />)
						}
					</ul>
				</div>
				<Order fishes={this.state.fishes}
					    order={this.state.order} 
					    params={this.props.params} />
				<Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
			</div>
		) 
	}
}

export default App;
