import React, { Component } from "react";
import { Link } from "react-router-dom";
import defaultImg from "../images/room-1.jpeg";

class CartRoom extends Component {
	render() {
		return (
			<article>
				<div className="cart-img-container">
					<Link to={`/rooms/${this.props.room.slug}`}>
						<img
							src={this.props.room.images[0] || defaultImg}
							alt="single room"
						/>
					</Link>

					{/* features */}

					<div className="cartObjectData">
						<Link to={`/rooms/${this.props.room.slug}`}>
							<p className="cartObjectName">
								{this.props.room.name}
							</p>
						</Link>

						<button
							onClick={() =>
								this.props.removeFromCart(this.props.room.id)
							}
							className="cartButton"
						>
							Delete
						</button>
					</div>

					<p className="cartObjectPrice">${this.props.room.price}</p>
				</div>

				{/* </Link> */}
			</article>
		);
	}
}

// CartRoom.propTypes = {
//     room: PropTypes.shape({
//         name: PropTypes.string.isRequired,
//         slug: PropTypes.string.isRequired,
//         images: PropTypes.arrayOf(PropTypes.string).isRequired,
//         price: PropTypes.number.isRequired
//     })
// };
export default CartRoom;
