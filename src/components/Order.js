import React from "react";
import { formatPrice } from "../helpers";
import CSSTransitionGroup from "react-addons-css-transition-group";

class Order extends React.Component {
	constructor() {
		super();

		this.renderOrder = this.renderOrder.bind(this);
	}

	renderOrder(key) {
		const { order, fishes, removeFromOrder } = this.props;
		const fish = fishes[key];
		const count = order[key];
		const removeButton = <button onClick={() => removeFromOrder(key)}>x</button>

		if(!fish || fish.status === 'unavailable'){
			return (
				<li key={key}>
					Sorry, {fish ? fish.name : 'fish' } is no longer available!
					{removeButton}
				</li>
			)
		}
		return (
			<li key={key}>
				<span>
					<CSSTransitionGroup 
							component="span"
							className="count"
							transitionName="count"
							transitionEnterTimeout={250}
							transitionLeaveTimeout={250}>
						<span key={count}>{count}</span>
						
					</CSSTransitionGroup>
					lbs {fish.name} {removeButton}
				</span>
				<span className="price">{formatPrice(count * fish.price)}</span>
			</li>
		)
	}

	render() {
		const { order, fishes } = this.props;
		const orderIds = Object.keys(order);
		const total = orderIds.reduce((prevTotal, key) => {
			const fish = fishes[key];
			const count = order[key];
			const isAvailable = fish && fish.status === 'available';

			if (isAvailable) {
				return prevTotal + (count * fish.price || 0);
			}

			return prevTotal;
		}, 0);

		return (
			<div className="order-wrap">
				<h2>Your order</h2>

				<CSSTransitionGroup 
					className="order" 
					component="ul"
					transitionName="order"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={500}>
					{orderIds.map(this.renderOrder)}
					<li className="total">
						<strong>Total:</strong>
						{formatPrice(total)}
					</li>
				</CSSTransitionGroup>
			</div>
		)
	}
}

export default Order;