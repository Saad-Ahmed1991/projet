import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import bg_video from "../../assets/bg_video.mp4";
import home_logo from "../../assets/home_logo.png";

const Home = () => {
  return (
    <div className="background">
      <div className="overlay"></div>
      <video src={bg_video} autoPlay loop muted />
      <div className="content">
        <img className="home_logo_img" src={home_logo} alt="home logo" />
        <h1 className="home_title"> Tunisia Services</h1>
        <div>
          <Link to="/home">
            <button className="explore_btn">Explore our services</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
