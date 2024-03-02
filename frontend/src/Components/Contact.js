import {React , useState} from "react";
import { IoHomeSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";
import axios from 'axios';
import {toast } from "react-toastify";
import API_URL from '../url'

const Contact = () => {

  const [userName , setUserName] = useState("");
  const [email , setEmail] = useState("");
  const [message , setmessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {userName : userName, email : email, message : message}
    axios.post(API_URL + "/contact", data)
    .then(res => {
      if(res.data.code === 200){
         toast.success("Message sent successfully.")
      }
    })
    .catch(err => console.log(err))
  }

    return (
    <>
      <div>
        <div className="map flex justify-center mt-10 mx-52">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96772.18174328149!2d-74.22462343708756!3d40.71513964422578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c250d225bfafdd%3A0x249f013a2cd25d9!2sJersey%20City%2C%20NJ%2C%20USA!5e0!3m2!1sen!2sin!4v1705843500016!5m2!1sen!2sin" width="1100" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className="contact-form flex p-7 gap-x-20 bg-white mt-10  mx-52 rounded-md">
          <div className="first-form w-96">
            <h1 className="font-bold text-xl">Contact Us</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-7 mt-10">
              <div>
                <input type="text" className="form-control bg-lightgrey border border-gray-400 p-2 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Name" required/>
              </div>
              <div>
                <input type="email" className="form-control bg-lightgrey border border-gray-400 p-2 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
              </div>
              <div>
                <textarea className="form-control bg-lightgrey border border-gray-400 p-2 rounded-md text-black w-full focus:outline-gray-500 focus:ring-gray-500" cols="30" rows="4" placeholder="Comment" value={message} onChange={(e) => setmessage(e.target.value)}></textarea>
              </div>
              <div>
                <button className="bg-brown px-5 py-3 rounded-full text-white hover:bg-lightpurple" type="submit">Submit</button>
              </div>
            </form>
          </div>
          <div className="second-form">
            <h1 className="font-bold text-xl">Get in Touch with us</h1>
            <div className="mt-10">
              <ul className="flex flex-col gap-y-6">
                <li className="flex items-center gap-x-3">
                  <IoHomeSharp/>
                  <p>Store No. 4567 US</p>
                </li>
                <li className="flex items-center gap-x-3">
                  <FaPhoneAlt />
                  <a href="tel:+97-546384059">+97-546384059</a>
                </li>
                <li className="flex items-center gap-x-3">
                  <IoMdMail />
                  <a href="mailto:nearyou@gmail.com">nearyou@gmail.com</a>
                </li>
                <li className="flex items-center gap-x-3">
                  <FaInfoCircle />
                  <p>Mon - Fri 10AM - 9PM</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );

};

export default Contact;