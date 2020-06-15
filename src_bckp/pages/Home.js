import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
// import Services from "../components/Services";
import Navbar1 from "../components/Navbar1/Navbar1";
import LandingPageHero from "./LandingPageHero";
// import LandingPageSearchBar from "./LandingPageSearchBar";

import Navbar2 from "../components/Navbar1/Navbar2/Navbar2";
export default function Home() {
	return (
		<>
			<Navbar2 source="Home" />
			<Navbar1 />
			{/* <LandingPageSearchBar />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<Hero>
				<Banner
					title="luxurious room"
					subtitle="deluxe rooms starting at ₹5000"
				>
					<Link to="/rooms" className="btn-primary">
						our rooms
					</Link>
				</Banner>
			</Hero>
			<Services />
			<LandingPageHero />

			<FeaturedRooms />
			<FooterPage /> */}
		</>
	);
}

Hero.defaultProps = {
	hero: "defaultHero"
};
