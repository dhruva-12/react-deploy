import React, { Component } from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import Card from "../components/Card";

import com612 from "./../images/Landing Page/612.jpg";
import com1851 from "./../images/Landing Page/1858.jpg";
import com661 from "./../images/Landing Page/661.jpg";
import com163 from "./../images/Landing Page/cmp163.jpg";
import com609 from "./../images/Landing Page/609.jpg";
import com241 from "./../images/Landing Page/241.jpg";

export default class SearchPage extends Component {
	render = () => {
		return (
			<React.Fragment>
				<div className="LPSearchContainer">
					<div className="LPSearch">
						<div className="LPnavbar">
							<Link to="" className="LPLink">
								Sign In
							</Link>
							<Link
								to=""
								className="LPLink"
								style={{ marginRight: "10vw" }}
							>
								Partners
							</Link>
						</div>

						<div className="LPSearchcenter">
							<input
								type="text"
								className="LPSearchbar"
								placeholder="Planning a trip? Choose a country"
							/>
							<button className="LPSearchButton">Search</button>
						</div>

						<div className="LPDiscover">
							<span
								style={{
									textAlign: "center",
									fontSize: "4rem",
									fontWeight: "bolder"
								}}
							>
								DISCOVER IT HERE
							</span>

							<span
								style={{
									textAlign: "center",
									fontSize: "2rem"
								}}
							>
								TOURS | WIFI | FOOD | ROOMS | GUIDE | BLOGS |
								TICKETS
							</span>
						</div>
					</div>
				</div>

				{/* <div className="LPDiscovery"> */}

				<div
					style={{
						width: "100vw",
						textAlign: "center",
						margin: "2rem 0"
					}}
				>
					<span
						className="LPDiscoveryHeading"
						style={{ color: "red" }}
					>
						Discover and book your best experiences here
					</span>
				</div>

				<div className="cardHolder">
					{/* Dummy Data, normally will be dynamically loadded */}

					<Card
						image={com612}
						text="Sydney Attractions Pass Booking Starting A$119"
					/>
					<Card image={com1851} text="hello" />
					<Card image={com661} text="hello" />
					<Card image={com163} text="hello" />
					<Card image={com609} text="hello" />
					<Card image={com241} text="hello" />
					<Card image={com609} text="hello" />
					<Card image={com241} text="hello" />

					<Card
						image={com612}
						text="Sydney Attractions Pass Booking Starting A$119"
					/>
					<Card image={com1851} text="hello" />
					<Card image={com661} text="hello" />
					<Card image={com163} text="hello" />
					<Card image={com609} text="hello" />
					<Card image={com241} text="hello" />
					<Card image={com609} text="hello" />
					<Card image={com241} text="hello" />

					<Card
						image={com612}
						text="Sydney Attractions Pass Booking Starting A$119"
					/>
					<Card image={com1851} text="hello" />
					<Card image={com661} text="hello" />
					<Card image={com163} text="hello" />
					<Card image={com609} text="hello" />
					<Card image={com241} text="hello" />
					<Card image={com609} text="hello" />
					<Card image={com241} text="hello" />

					<Card
						image={com612}
						text="Sydney Attractions Pass Booking Starting A$119"
					/>
					<Card image={com1851} text="hello" />
					<Card image={com661} text="hello" />
					<Card image={com163} text="hello" />
					<Card image={com609} text="hello" />
					<Card image={com241} text="hello" />
					<Card image={com609} text="hello" />
					<Card image={com241} text="hello" />

					<Card
						image={com612}
						text="Sydney Attractions Pass Booking Starting A$119"
					/>
					<Card image={com1851} text="hello" />
					<Card image={com661} text="hello" />
					<Card image={com163} text="hello" />
					<Card image={com609} text="hello" />
					<Card image={com241} text="hello" />
					<Card image={com609} text="hello" />
					<Card image={com241} text="hello" />
				</div>
				{/* </div> */}

				<div class="LPFooter">.</div>
			</React.Fragment>
		);
	};
}
