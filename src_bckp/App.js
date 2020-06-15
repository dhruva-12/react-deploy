import React from 'react';
import Home from './pages/Home';
import Rooms from './pages/RoomFinal';
import SingleRoom from './pages/SingleRoom';
import Error from './pages/Error';
import Cart from './pages/Cart'
// import Signup from './pages/Signup';
// import Login from './pages/Login';
// import Navbar from './components/Navbar';
import './App.css';
// import Navbar2 from './components/Navbar1/Navbar2/Navbar2'
// import FooterPage from './pages/Footer';
import { Route, Switch } from 'react-router-dom';
import Profile from './pages/Profile'

import LoginPrad from './pages/LoginPrad'
import SignupPrad from './pages/SignupPrad'
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage';
import RoomUI from './components/RoomUI';
import Hotel from './pages/Hotel';
import AboutUs from './pages/AboutUs'
import TOS from './pages/TOS';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ContactUs from './pages/ContactUs';


function App() {
  return (
    <>

      <Switch>
        <Route exact path='/home' component={Home} />
        <Route exact path='/rooms' component={Rooms} />
        <Route exact path='/rooms/:slug' component={SingleRoom} />
        <Route exact path='/login' component={LoginPrad} />
        <Route exact path='/signup' component={SignupPrad} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/cart' component={Cart} />
        <Route exact path='/' component={LandingPage} />
        <Route exact path="/SearchPage" component={SearchPage} />
        <Route exact path="/RoomUI" component={RoomUI} />
        <Route exact path="/Hotel/:slug" component={Hotel} />
        <Route exact path="/AboutUs" component={AboutUs} />
        <Route exact path="/ContactUs" component={ContactUs} />
        <Route exact path="/termsandconditions" component={TOS} />
        <Route exact path="/PrivacyPolicy" component={PrivacyPolicy} />

        <Route component={Error} />
      </Switch>

    </>
  );
}

export default App;
