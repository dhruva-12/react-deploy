import React, { Component } from "react";
import "./../pages/LandingPage.css";

// export default LPImage = (props) => {
//     return(
//         <div className={styles.LPImage} style={{backgroundImage: url(this.props.url)}}>
//             {this.props.text}
//         </div>
//     )
// }

export default class LPImage extends Component {
	render() {
		return (
			<div
				className="LPRowImage"
				style={{ backgroundImage: `url( ${this.props.url} )` }}
			>
				<div
					className="LPImageBlack"
					onClick={() => this.props.handleClick(this.props.text)}
				>
					{this.props.text}
				</div>
			</div>
		);
	}
}
