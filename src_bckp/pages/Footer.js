import React, {useState} from "react";
import './Footer.css'
import { Link } from "react-router-dom";
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa'
import { MdMail } from 'react-icons/md'
import { Button, Select } from "antd";

const { Option } = Select
const FooterPage = () => {

  const [currency, setCurrency] = useState(localStorage.getItem("currency") || "MYR")
  const changeCurrency = (val) => {
    setCurrency(val)
    localStorage.setItem('currency', val)
  }
    return (
      <React.Fragment>
        <div className="LPFooter">
          <div className="FooterColumn">
            <span className="FooterHeading">COMPANY</span>
            <div>
              {/* <Link to="#">USD</Link> */}
              <Select
                value={currency}
                onChange={(value)=>{changeCurrency(value)}}
              >
              <Option key="MYR">MYR</Option>
              <Option key="USD">USD</Option>
              <Option key="EUR">EUR</Option>
              <Option key="INR">INR</Option>
              <Option key="AED">AED</Option>
              <Option key="PHP">PHP</Option>
              <Option key="BHD">BHD</Option>
              <Option key="SAR">SAR</Option>
              <Option key="OMR">OMR</Option>
              <Option key="QAR">QAR</Option>
              </Select>
            </div>
            <span>
              <Link >English</Link>
            </span>
            <span>
              <Link to="/aboutus">About Us</Link>
            </span>
            <span>
              <Link to="/ContactUs">Contact Us</Link>
            </span>
            <span>
              <Link to="/termsandconditions">Terms & Conditions</Link>
            </span>
            <span>
              <Link to="/privacypolicy">Privacy Policy</Link>
            </span>
          </div>

          {/* <div className="FooterColumn">
            
          </div> */}

          <div className="FooterColumn">
            <span className="FooterHeading">FOLLOW US</span>
            <div className="footersocial">
              <Link to="#">
                <FaFacebookSquare />
              </Link>
              <Link to="#">
                <FaInstagram />
              </Link>
            </div>
            {/* <span>
              <Link to="#">Newsletter</Link>
            </span> */}
          </div>

          <div></div>
          <div
            className="FooterColumn"
            style={{
              alignSelf: "flex-end",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <span style={{ margin: "0 2rem" }}>
              Ready to get deals? Lets get started!{" "}
            </span>
            <Button
              type="primary"
              style={{
                backgroundColor: "#f48247",
                color: "white",
                border: "none",
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <MdMail style={{color:'white', marginRight: '1rem'}} />
              Subscribe to our Newsletter
            </Button>
          </div>
          {/* <div className="FooterColumn" style={{alignSelf: 'flex-end'}}>
            
          </div> */}
        </div>



        <div className="LowerFooter">
          <span style={{margin:'1rem 3rem'}}>
            Copyright © 2020. Visitors Deals. All Rights Reserved
          </span>

         
        </div>
      </React.Fragment>
    );
}

export default FooterPage;