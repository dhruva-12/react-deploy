import React, { Component } from "react";
import "./SideMenu.css";
import { MDBBtn, MDBIcon } from "mdbreact";
export default class SideMenu extends Component {
	render() {
		return (
			<div className="mainContainer">
				<div className="sideMenu">
					<MDBBtn
						outline
						color="primary"
						onClick={() => this.props.handleSelection("profile")}
						className="buttonPadding"
					>
						<MDBIcon icon="magic" className="mr-1" /> Profile
					</MDBBtn>

					<MDBBtn
						outline
						color="primary"
						onClick={() => this.props.handleSelection("booking")}
						className="buttonPadding"
					>
						<MDBIcon icon="magic" className="mr-1" /> Booking History
					</MDBBtn>

					<MDBBtn
						outline
						color="primary"
						onClick={() => this.props.handleSelection("transaction")}
						className="buttonPadding"
					>
						<MDBIcon icon="magic" className="mr-1" /> Transaction History
					</MDBBtn>
				</div>
			</div>
		);
	}
}
