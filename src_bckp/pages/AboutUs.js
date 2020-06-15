import React from "react";
import "./LegalDocuments.css";
import Footer from "./Footer";
import Header from "../components/Header";

const AboutUs = () => {
  return (
    <div className="docsPage">
      <Header />
      <div className="docsContainer">
        <span className="docsHeading">About Us</span>
        <hr style={{ margin: "2rem 0" }} />
        <p className="docsPara">
          VisitorsDeals its an idea to give special deals to people who use our
          site to book their rooms, we have hotel rooms inventory of more than
          900,000 unique properties from the leading suppliers from all around
          the world, we aggregate the rates and always gives you the lowest rate
          possible for the rooms you have selected . We always strive to make
          your travel experience a better one, so for your up coming trip book
          your rooms with us now .
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
