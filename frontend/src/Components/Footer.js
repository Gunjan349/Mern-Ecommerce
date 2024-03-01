import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="footer bg-purple text-white mt-16">
        <div className="flex py-8 justify-around items-center border-b-2 border-lightpurple md:flex-col md:gap-y-2">
          <h1
            className="cursor-pointer font-bold tracking-wide text-xl"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back To Top
          </h1>
        </div>
        <div className="flex justify-around pt-8 pb-11">
          <div className="contact">
            <h5 className="text-xl font-bold">Contact Us</h5>
            <br />
            <p>
              nearYou store <br />
              No. 4567 Travel
              <br /> Street
              <br />
              United States
            </p>
            <br />
            <h1>+97-546384059</h1>
            <br />
            <br />
            <div className="flex">
              <div>nearyou@gmail.com</div>
              <div className="connect">
                <div className="flex gap-x-5 absolute right-10">
                  <a href="https://www.instagram.com" target="_blank">
                    <FaInstagram size={25} />
                  </a>
                  <a href="https://m.youtube.com" target="_blank">
                    <FaYoutube size={25} />
                  </a>
                  <a href="https://in.pinterest.com" target="_blank">
                    <FaPinterest size={25} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="info">
            <h5 className="text-xl font-bold">Infromation</h5>
            <br />
            <Link to="/privacy-policy">Privacy Policy</Link>
            <br />
            <Link to="/refund-policy">Refund Policy</Link>
            <br />
            <Link to="/shipping-policy">Shipping Policy</Link>
            <br />
          </div>

          <div className="quick-links xs:hidden">
            <h5 className="text-xl font-bold">Quick Links</h5>
            <br />
            <Link to="/Devices">Mobiles</Link>
            <br />
            <Link to="/Toys">Toys</Link>
            <br />
            <Link to="/Books">Books</Link>
            <br />
            <Link to="/Devices">Headphones</Link>
          </div>
        </div>

        <div className="copyright flex py-5 border-t-2 border-lightpurple justify-center">
          &copy; {new Date().getFullYear()}; Developed by GuNjaN GaRg
        </div>
      </footer>
    </>
  );
};

export default Footer;
