import React, { Component } from "react";
import "../pages/LandingPage.css";

export default class Card extends Component {
	render = () => {
		return (
			<div className="LPCard">
				<div
					className="LPCardImage"
					style={{ backgroundImage: `url(${this.props.image})` }}
				>
					<button className="LPButton">♥</button>
				</div>
				<div style={{ fontWeight: "bold" }}>{this.props.text}</div>
			</div>
		);
	};
}

// const styles = {
//     LPCard: {
//         height: "380px",
//         width: "210px",
//         backgroundColor: "yellow",

//         display:"flex",
//         flexDirection:"column",

//         //210 x 260
//     },

//     // LPCardImage: {
//     //     height: "260px",
//     //     width: "210px",

//     //     backgroundSize: "cover",
//     //     backgroundPosition: "center center"
//     // }
// }
