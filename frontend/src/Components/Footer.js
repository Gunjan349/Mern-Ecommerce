import React from "react";
import { Link } from "react-router-dom";
import { FaRegPaperPlane } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="footer bg-purple text-white mt-16">
        <div className="newsletter flex py-8 justify-around items-center border-b-2 border-lightpurple md:flex-col md:gap-y-2">
          <div className="flex gap-x-3">
            <FaRegPaperPlane size={25} />
            <div className="signup text-2xl font-medium md:text-lg">
              Sign Up For Newsletter
            </div>
          </div>
          <div className="flex gap-x-3">
            <input
              type="email"
              placeholder="Your email"
              className="input p-2 border-none text-black outline-none w-96 rounded-md sm:w-72"
            />
            <button className="bg-pink rounded-md px-3 font-medium">
              Subscribe
            </button>
          </div>
        </div>
        <div className="lower-footer flex justify-around pt-8 pb-11">
          <div className="contact">
            <h5 className="text-xl font-bold">Contact Us</h5><br />
            <p>
              nearYou store <br />
              No. 4567 Travel Street<br />
              United States
            </p><br /> 
            <mobile>+97-546384059</mobile><br /><br />
            <mail>nearyou@gmail.com</mail>
          </div>
          <div className="info">
            <h5 className="text-xl font-bold">Infromation</h5><br />
            <Link to="/privacy-policy">Privacy Policy</Link><br />
            <Link to="/refund-policy">Refund Policy</Link><br />
            <Link to="/shipping-policy">Shipping Policy</Link><br />
            <Link to="/terms&conditions">Terms Of Service</Link><br />
            <Link to="/">Blogs</Link>
          </div>
          <div className="account">
            <h5 className="text-xl font-bold">Account</h5><br />
            <Link to="/">Search</Link><br />
            <Link to="/">Contact Us</Link><br />
            <Link to="/">About Us</Link><br />
            <Link to="/">FAQ</Link><br />
            <Link to="/">Size Chart</Link><br />
          </div>
          <div className="quick-links md:hidden">
            <h5 className="text-xl font-bold">Quick Links</h5><br />
            <Link to="/">Mobiles</Link><br />
            <Link to="/">Shoes</Link><br />
            <Link to="/">Watches</Link><br />
            <Link to="/">Headphones</Link>
          </div>
          <div className="connect sm:hidden">
            <h5 className="text-xl font-bold sm:hidden">Social Media Links</h5><br />
           <div className="flex gap-x-3 justify-center md:gap-x-2 sm:mt-40">
            <Link to="/"><FaInstagram size={25}/></Link>
            <Link to="/"><FaYoutube size={25}/></Link>
            <Link to="/"><FaTwitter size={25}/></Link>
            <Link to="/"><FaPinterest size={25}/></Link>
           </div>
          </div>
        </div>
        <div className="copyright flex py-5 border-t-2 border-lightpurple">
            &copy; {new Date().getFullYear()}; Developed by GuNjaN GaRg
        </div>
      </footer>
    </>
  );
};

export default Footer;
