import React from "react";
import apple from "../images/app-store.webp";
import "../index.css";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import googleplay from "../images/playStore.png";
const Footer = () => {
  return (
    <>
      {/* <div className="footer">
    <div className="footer-container d-flex">
        <div className="footer-head">SHOPKART</div>
        <div className="left-link">
          <h1>ABOUT SHOPKART</h1>
          <ul>
            <li>Who We Are</li>
            <li>Blog</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="mid-link">
          <h1>LEARN MORE</h1>
          <ul>
            <li>Privacy</li>
            <li>Security</li>
            <li>Terms</li>
          </ul>
        </div>
        <div className="right-link">
          <h1>SOCIAL LINK</h1>
          <ul>
            <li>
              <i className="fa-brands fa-instagram"></i>
            </li>
            <li>
              <i className="fa-brands fa-facebook"></i>
            </li>
            <li>
              <i className="fa-brands fa-x-twitter"></i>
            </li>
            <li>
              <i className="fa-brands fa-youtube"></i>
            </li>
          </ul>
          <div className="logo-app">
            <img src={apple} alt="app-store" />
            <img src={googleplay} alt="playStore" />
          </div>
        </div>
      </div>
    </div>
      
      <div className="sign">
        <h2>Made with Love ♥ by Dhananjay!</h2>
      </div> */}
      <div className="footer">
        <div className="footer-container d-flex flex-wrap justify-content-between">
          {/* <!-- Footer Header --> */}
          <div className="footer-head">SHOPKART</div>

          {/* <!-- Left Links Section --> */}
          <div className="left-link col-12 col-md-3">
            <h1>ABOUT SHOPKART</h1>
            <ul className="list-unstyled">
              <li>Who We Are</li>
              <li>Blog</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* <!-- Middle Links Section --> */}
          <div className="mid-link col-12 col-md-3">
            <h1>LEARN MORE</h1>
            <ul className="list-unstyled">
              <li>Privacy</li>
              <li>Security</li>
              <li>Terms</li>
            </ul>
          </div>

          <div className="right-link col-12 col-md-3">
            <h1>SOCIAL LINK</h1>
            <ul className="list-inline">
              <li className="list-inline-item">
                {/* <i className="fa-brands fa-instagram"></i> */}
                <FaInstagram />
              </li>
              <li className="list-inline-item">
                {/* <i className="fa-brands fa-facebook"></i> */}
                <FaFacebook />
              </li>
              <li className="list-inline-item">
                {/* <i className="fa-brands fa-x-twitter"></i> */}
                <FaXTwitter />
              </li>
              <li className="list-inline-item">
                {/* <i className="fa-brands fa-youtube"></i> */}
                <FaYoutube />
              </li>
            </ul>

            <div className="logo-app mt-3">
              <img src={apple} alt="app-store" className="img-fluid" />
              <img
                src={googleplay}
                alt="playStore"
                className="img-fluid mt-2"
              />
            </div>
          </div>
        </div>

        <div className="sign text-center">
          <h2>Made with Love ♥ by Dhananjay!</h2>
        </div>
      </div>
    </>
  );
};

export default Footer;
