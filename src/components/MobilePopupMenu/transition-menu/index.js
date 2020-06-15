import React, { useState } from "react";
import { GoX } from "react-icons/go";
import { Spring, config, animated } from "react-spring/renderprops";
import withTransitionToggle from "../with-transition-toggle";
import { Link } from "react-router-dom";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { Select } from "antd"
import "../../../pages/Footer.css";
const bottomOffset = -400;
const { Option } = Select

const baseStyles = {
  height: "50vh",
  position: "fixed",
  paddingTop: 16,
  overflowY: "auto",
  width: "100%",
  zIndex: 2,
  scrollbarWidth: "none",
};

const AnimateContainer = ({style, rest, onClick}) => {

  
  const [currency, setCurrency] = useState(localStorage.getItem("currency") || "MYR")
  if (style.bottom === bottomOffset) {
    return null;
  }
  const changeCurrency = (val) => {
    setCurrency(val)
    localStorage.setItem('currency', val)
  }

  return (
    <animated.div style={{ ...baseStyles, ...style }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "rgba(0,0,0,.4)",
            width: "95%",
            height: "50vh",
            display: "flex",
            flexDirection: "row",
            borderTopLeftRadius: "2rem",
            borderTopRightRadius: "2rem",
            padding: "2rem",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: "1.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>

              <Link style={{ color: "white" }} >
                Currency
              </Link>
            </div>
            {

              // <div style={{display:'flex', flexWrap:'wrap'}}>
              //   {data.map((value, index)=> {
              //     if(currency === value){
              //       return <div key={index} style={{width:'50%', color:"#f48247"}}>{value}</div>
              //     } else {
              //       return <div key={index} style={{width:'50%'}} onClick={()=> setCurrency(value)}>{value}</div>
              //     }
              //   })}
              // </div>

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
            }
            <div>
              <Link style={{ color: "white" }} to="#">
                English
              </Link>
            </div>
            <div>
              <Link style={{ color: "white" }} to="/aboutus">
                About Us
              </Link>
            </div>
            <div>
              <Link style={{ color: "white" }} to="/ContactUs">
                Contact Us
              </Link>
            </div>
            <div>
              <Link style={{ color: "white" }} to="/termsandconditions">
                Terms & Conditions
              </Link>
            </div>
            <div>
              <Link style={{ color: "white" }} to="/privacypolicy">
                Privacy Policy
              </Link>
            </div>
            <div className="footersocial">
              <div style={{marginRight: '2rem'}}>
                <Link style={{ color: "white", fontSize: "4rem" }} to="#">
                  <FaFacebookSquare />
                </Link>
              </div>
              <div>
                <Link style={{ color: "white", fontSize: "4rem" }} to="#">
                  <FaInstagram />
                </Link>
              </div>
            </div>
            <div>
              <Link style={{ color: "white" }} to="#">
                Newsletter
              </Link>
            </div>
          </div>

          <div>
            <GoX
              style={{ color: "white", fontSize: "1.5rem" }}
              onClick={onClick}
            />
          </div>
        </div>
      </div>
    </animated.div>
  );
};

const TransitionMenu = (props) => {
  
  const { open = false, springProps, ...rest } = props;

  let toBottom = bottomOffset;

  if (open) toBottom = 0;

  return (
    <Spring
      {...springProps}
      native
      config={config.stiff}
      from={{ bottom: bottomOffset }}
      to={{ bottom: toBottom }}
    >
      {(style) => (
        <AnimateContainer 
          style={style} 
          rest={rest} 
          onClick={props.onClick} 
          currency={props.currency}
          setCurrency={props.setCurrency}  
        />
      )}
    </Spring>
  );
};

export default withTransitionToggle(TransitionMenu);
