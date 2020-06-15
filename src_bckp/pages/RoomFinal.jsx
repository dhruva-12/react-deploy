import RoomComponent from "../components/RoomComponent";
import React, { useEffect, useState } from "react";
import OrangeSearchBar from "../components/OrangeSearchBar";
import Header from "../components/Header";
import Footer from "./Footer";
import "./RoomFinal.css";
import { Select, Slider, InputNumber } from "antd";
import Filter from "../components/Filter";
import MobileLocation from "../components/MobileLocation";
import ScrollTop from "react-scrolltop-button";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
const { Option } = Select
const Rooms = (props) => {
    const [currency, setCurrency] = useState(localStorage.getItem("currency") || "MYR")
    const changeCurrency = (val) => {
        localStorage.setItem('currency', val)
        setCurrency(val)
    }

    let callCount = 0;
    let perPageContent = 50;

    if (!localStorage.getItem('currency')) {
        changeCurrency("MYR")
    }

    const [hotel, setHotel] = useState([]);
    const [filter, setFilter] = useState(
        localStorage.getItem("filter") ? localStorage.getItem("filter") : "ph"
    );
    const [inProgress, setProgress] = useState(true);
    const [search, setSearch] = useState(false);
    const [minHotelPrice, setMin] = useState(0);
    const [maxHotelPrice, setMax] = useState(100);
    const [minFilterPrice, setFilterMin] = useState(minHotelPrice);
    const [maxFilterPrice, setFilterMax] = useState(maxHotelPrice);
    const [seeFilters, setseeFilters] = useState(false);

    const hotelHolder = {};
    const guid = () => {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return (
            s4() +
            s4() +
            "-" +
            s4() +
            "-" +
            s4() +
            "-" +
            s4() +
            "-" +
            s4() +
            s4() +
            s4()
        );
    };
    const header = {
        "Content-Type": "application/json; charset=utf-8",
        "Accept-Encoding": " gzip, deflate",
        "customer-ip": "49.37.192.211",
        correlationId: guid(),
        accountId: "demoAccount",
        currency,

    };
    const getLocation = () => {
        let place = props.location.state.place;
        let code;

        return new Promise((resolve, reject) => {
            fetch(
                `https://nexus.prod-env.vervotech.com/api/locations/locationcontent/autosuggest?term=${place}&countries=${code}`, {
                    method: "GET",
                }
            ).then((res) => {
                res.json().then((place) => {
                    console.log(place.locationSuggestions[0].id);
                    // response will be getting the subcoordinates of the search place with checkIn checkOut date
                    fetch(
                        `https://nexus.prod-env.vervotech.com/api/locations/locationcontent/location/${place.locationSuggestions[0].id}?getSublocations=true`, {
                            method: "GET",
                        }
                    ).then((location) => resolve(location.json()));
                });
            });
        });
    };
    const getStaticData = (opts) => {
        fetch(
                "https://nexus.dev-env.vervotech.com/api/content/hotelcontent/getHotelContent", {
                    method: "POST",
                    body: JSON.stringify(opts),
                    headers: header,
                }
            )
            .then((res) => res.json())
            .then(async(staticData) => {
                let firstLoad = staticData.hotels.slice(0, perPageContent);

                console.log("first-load-list", firstLoad);

                setHotel(firstLoad);
                staticData.hotels.map((item) => {
                    hotelHolder[item.id] = item;
                });

                console.log("staticHotel", hotelHolder);
            })
            .catch((e) => console.log(e));
    };
    const initCall = (opts) => {
        return new Promise((resolve, reject) => {
            fetch("https://nexus.dev-env.vervotech.com/api/hotel/availability/init", {
                method: "POST",
                body: JSON.stringify(opts),
                headers: header,
            }).then((res) => resolve(res.json()));
        });
    };
    const recursiveCall = (count, responseToken, nextResultsKey) => {


        let url = `https://nexus.dev-env.vervotech.com/api/hotel/availability/async/${responseToken.token}/results`;
        if (nextResultsKey) {
            url += `?nextResultsKey=${nextResultsKey}`;
        }

        return fetch(url, {
                method: "GET",
                headers: header,
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                return data;
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const processHotel = async(data) => {
        let updated = false;
        data.hotels &&
            data.hotels.map((item) => {
                if (typeof hotelHolder[item.id] !== "undefined") {
                    hotelHolder[item.id] = {...hotelHolder[item.id], ...item };
                }
            });
    };

    const getHotel = (responseToken, nextResultsKey = null) => {
        recursiveCall(callCount, responseToken, nextResultsKey).then(
            async(data) => {
                processHotel(data);

                if (data.status == "InProgress") {


                    if (typeof data.nextResultsKey != "undefined") {
                        nextResultsKey = data.nextResultsKey;
                    }



                    getHotel(responseToken, nextResultsKey);
                } else {
                    if (data.status == "Completed") {

                        const newstaticHotel = {};
                        Object.values(hotelHolder).map((item, index) => {
                            if (item.rate != null) {
                                return (newstaticHotel[item.id] = item);
                            }
                        });

                        console.log("complete-list", newstaticHotel);

                        setHotel(Object.values(newstaticHotel));

                        let max = Math.max.apply(
                            Math,
                            Object.values(newstaticHotel).map((o) => {
                                return o.rate.totalRate;
                            })
                        );
                        let min = Math.min.apply(
                            Math,
                            Object.values(newstaticHotel).map((o) => {
                                return o.rate.totalRate;
                            })
                        );
                        setMax(max);
                        setMin(min);

                        setFilterMax(max);
                        setFilterMin(min);

                        setProgress(false);
                    }

                    return data;
                }
            }
        );
    };

    const onChangeRange = (value) => {
        setFilterMax(value[1]);
        setFilterMin(value[0]);
    };

    const getHotelData = () => {
        const checkInDate = props.location.state.startDate;
        const checkOutDate = props.location.state.endDate;
        const occupancies = props.location.state.occupancies;

        getLocation().then((coordinates) => {
            let opts = {
                channelId: "demoChannel",
                currency,
                culture: "en-US",
                checkIn: checkInDate,
                checkOut: checkOutDate,
                occupancies,
                nationality: "IN",
                countryOfResidence: "IN",
                polygonalRegion: {
                    coordinates: coordinates.boundaries[0],
                },
            };

            getStaticData(opts);
            initCall(opts).then((responseToken) => {
                console.log("Hotel Token", responseToken);
                localStorage.setItem("inittoken", responseToken.token);
                localStorage.setItem("correlationId", header.correlationId);
                getHotel(responseToken);
            });
        });
    };

    useEffect(() => {
        setProgress(true);
        getHotelData();
    }, [
        props.location.state.place,
        currency, props.location.state.startDate,
        props.location.state.endDate,
        currency
    ]);

    const sort_by = (field, reverse, primer) => {
        const key = primer ?

            function(x) {
                return primer(x[field]);
            } :
            function(x) {
                return x[field];
            };

        reverse = !reverse ? 1 : -1;

        return function(a, b) {
            return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
        };
    };

    const sort_by_price = (reverse) => {
        const key = function(x) {
            return parseFloat(x.rate.totalRate);
        };

        reverse = !reverse ? 1 : -1;

        return function(a, b) {
            return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
        };
    };
    const handleFilter = (value) => {
        setFilter(value);
    };

    const handleSearch = () => {
        setSearch(!search);
    };

    let filteredHotel = [];
    if (!inProgress) {
        filteredHotel = hotel.filter((hotel) => {
            return (
                hotel.rate.totalRate >= minFilterPrice &&
                hotel.rate.totalRate <= maxFilterPrice
            );
        });
    }

    if (inProgress) {
        filteredHotel = hotel;
    } else if (filter === "sh") {
        filteredHotel = filteredHotel.sort(sort_by("starRating", true, parseFloat));
    } else if (filter === "pl") {
        filteredHotel = filteredHotel.sort(sort_by_price(false));
    } else if (filter === "ph") {
        filteredHotel = filteredHotel.sort(sort_by_price(true));
    }

    filteredHotel = filteredHotel.slice(0, perPageContent);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    let seeFilterOption = {
        style: { display: 'none' }
    }

    if (seeFilters) {
        seeFilterOption = {
            style: { display: 'flex' }
        }
    } else {
        seeFilterOption = {
            style: { display: 'none' }
        }
    }

    return ( <
        div className = "roomFinalMain" >
        <
        Header signIn = { false }
        fixed = { true }
        /> <
        ScrollTop icon = { < IoIosArrowUp / > }
        className = "scrollToTopClass"
        text = { < IoIosArrowUp / > }
        /> <
        div style = {
            { height: "8vh" } }
        /> <
        div className = "mobileSearch" >
        <
        MobileLocation place = { props.location.state.place }
        search = { search }
        handleSearch = { handleSearch }
        startDate = { props.location.state.startDate }
        endDate = { props.location.state.endDate }
        /> <
        /div> <
        section className = "roomslist" > {
            search && ( <
                OrangeSearchBar backgroundColor = "#f48244"
                place = { props.location.state.place }
                startDate = { props.location.state.startDate }
                endDate = { props.location.state.endDate }
                history = { props.history }
                reset = { true }
                />
            )
        }

        <
        div className = "desktopSearch" >
        <
        OrangeSearchBar backgroundColor = "#f48244"
        place = { props.location.state.place }
        startDate = { props.location.state.startDate }
        endDate = { props.location.state.endDate }
        history = { props.history }
        top = { "9vh" }
        reset = { true }
        />

        <
        div className = "roomUIList" >
        <
        div className = "FilterControl"
        onClick = {
            () => setseeFilters(!seeFilters) } >
        <
        div > Filters < /div> <
        div > { seeFilters ? < IoIosArrowUp / > : < IoIosArrowDown / > } < /div> <
        /div> <
        div className = "fliterMainContainer" {...seeFilterOption } >

        <
        Slider min = { minHotelPrice }
        max = { maxHotelPrice }
        range = { true }
        value = {
            [minFilterPrice, maxFilterPrice] }
        onChange = { onChangeRange }
        className = "mobileSlider" /
        >
        <
        Filter handleFilter = { handleFilter }
        />

        <
        div className = "filterTop desktopCurrency" / >
        <
        div className = "filterSelect desktopCurrency" >
        <
        Select value = { currency }
        onChange = {
            (value) => { changeCurrency(value) } } >
        <
        Option key = "MYR" > Currency: MYR < /Option> <
        Option key = "USD" > Currency: USD < /Option> <
        Option key = "EUR" > Currency: EUR < /Option> <
        Option key = "INR" > Currency: INR < /Option> <
        Option key = "AED" > Currency: AED < /Option> <
        Option key = "PHP" > Currency: PHP < /Option> <
        Option key = "BHD" > Currency: BHD < /Option> <
        Option key = "SAR" > Currency: SAR < /Option> <
        Option key = "OMR" > Currency: OMR < /Option> <
        Option key = "QAR" > Currency: QAR < /Option> <
        /Select> <
        /div> <
        /div>

        { /* {inProgress &&<Spin size="large" />} */ } <
        div className = "roomfinalcontainer" > {
            filteredHotel.map((item, index) => {
                return ( <
                    RoomComponent history = { props.history }
                    place = { props.location.state.place }
                    startDate = { props.location.state.startDate }
                    endDate = { props.location.state.endDate }
                    key = { item.id } {...item }
                    />
                );
            })
        } <
        /div> <
        /div> <
        /section> <
        Footer / >
        <
        /div>
    );
};

export default Rooms;