import React, { Component } from 'react'
import Header from '../components/Header'
import FeaturedImages from '../components/MobileRoom/FeaturedImages'
import Axios from 'axios'
import './Hotel.css'
import HotelReviews from '../components/MobileRoom/HotelReviews'
import HotelLocation from '../components/MobileRoom/HotelLocation'
import Landmarks from '../components/MobileRoom/Landmarks'
import OrangeSearchBar from '../components/OrangeSearchBar'
import Footer from './Footer'
import { Spin } from 'antd';
import ScrollTop from "react-scrolltop-button";
import { IoIosArrowUp } from 'react-icons/io'

import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import DesktopFeaturedImages from '../components/HotelDesktop/DesktopFeaturedImages'
import RoomsAndRates from '../components/HotelDesktop/RoomsAndRates'

export default class MobileRoom extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            loading: true,
        }
    }

    componentDidMount = async () => {
        let response = await Axios.get(`https://cors-anywhere.herokuapp.com/https://b2c.prod-env.vervotech.com/api/hotels/${this.props.match.params.slug}/content`)
        let hotel = response.data.hotel
        this.setState({ data: hotel, loading: false })
        window.scrollTo(0, 0)

    }


    render() {

        if (this.state.loading) {
            return (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    <Spin size="large" />
                </div>
            )
        }

        return (
          <React.Fragment>
            <div className="HotelMobileContainer">
              <Header signIn={false} fixed={true} />
              <ScrollTop
                icon={<IoIosArrowUp />}
                className="scrollToTopClass"
                text={<IoIosArrowUp />}
              />
              <div style={{ height: "9vh" }} />
              <FeaturedImages images={this.state.data.images} />
              <div
                style={{
                  fontSize: "1.5rem",
                  margin: "1rem",
                  marginBottom: "0.5rem",
                }}
              >
                {this.state.data.name}
              </div>
              <HotelReviews
                type={this.state.data.type}
                starRating={this.state.data.starRating}
              />
              <HotelLocation name={this.state.data.name} geoCode={this.state.data.geoCode} address={this.state.data.contact.address} />
              <Landmarks
                nearByAttractions={this.state.data.nearByAttractions}
              />
              <RoomsAndRates hotelId={this.props.match.params.slug} />
            </div>

            <div className="HotelDesktopContainer">
              <Header fixed={true} />
              <ScrollTop
                icon={<IoIosArrowUp />}
                className="scrollToTopClass"
                text={<IoIosArrowUp />}
              />
              <div style={{ height: "9vh" }} />
              <DesktopFeaturedImages images={this.state.data.images} />

              <div className="HoteldataContainer">
                <OrangeSearchBar
                  history={this.props.history}
                  backgroundColor="#f48247"
                  top="9vh"
                  place={
                    this.props.location.state && this.props.location.state.place
                  }
                  startDate={
                    this.props.location.state &&
                    this.props.location.state.startDate
                  }
                  endDate={
                    this.props.location.state &&
                    this.props.location.state.endDate
                  }
                  reset={true}
                />

                <div className="mainData">
                  <div
                    style={{
                      fontSize: "3rem",
                      margin: "1rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {this.state.data.name}
                  </div>
                  <HotelReviews
                    type={this.state.data.type}
                    starRating={this.state.data.starRating}
                  />
              <HotelLocation name={this.state.data.name} geoCode={this.state.data.geoCode} address={this.state.data.contact.address} />
                  <Landmarks
                    nearByAttractions={this.state.data.nearByAttractions}
                  />
                  <RoomsAndRates hotelId={this.props.match.params.slug} />
                </div>
              </div>

              <Footer />
            </div>
          </React.Fragment>
        );

    }
}