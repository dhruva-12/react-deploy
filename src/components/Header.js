import React from 'react'
import {Link} from 'react-router-dom'
import '../pages/LandingPage.css'

const Header = (props) => {
    
    const signIn = (
        <Link
            to="/Admin"
            className="LPLink"
            style={{ marginRight: "10vw" }}
        >
            Sign In
        </Link>
    )

    let navbarstyle = "LPnavbar"

    if(props.fixed){
        navbarstyle = "LPnavbarfixed"
    }

    return (
      <div className={navbarstyle}>
        <Link to="/">
          <div className="logoLP" style={{ margin: "0 1rem" }} />
        </Link>

        {props.signIn && signIn}
      </div>
    );


}

export default Header