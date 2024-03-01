import React from "react";
import "../App.css";
import { NavLink, useNavigate } from "react-router-dom";
import categories from "./Categories";

const Navbar = () => {
  const rights = JSON.parse(localStorage.getItem("rights"))[0].permissions;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <>
      <div className="flex">
        <div className="navbar flex z-10 w-screen text-white bg-brown text-lg cursor-pointer leading-10">
          <div className=" hover:bg-white hover:text-brown">
            <NavLink to="/">
              <h3 className="px-3">Home</h3>
            </NavLink>
          </div>

          <div className=" hover:bg-white hover:text-brown">
            <NavLink to="/store">
              <h3 className="px-3">Our Store</h3>
            </NavLink>
          </div>

          <div className="flex md:hidden">
            {categories &&
              categories.length > 0 &&
              categories.map((item, index) => {
                return (
                  <h3
                    className="px-3 hover:bg-white hover:text-brown"
                    onClick={() => navigate("/category/" + item)}
                  >
                    {item}
                  </h3>
                );
              })}
          </div>

          {rights.indexOf("Update price") !== -1 && token && (
            <div className="hover:bg-white hover:text-brown">
              <NavLink to="/add/products">
                <h3>Add Products</h3>
              </NavLink>
            </div>
          )}

          <div className=" hover:bg-white hover:text-brown">
            <NavLink to="/contact">
              <h3 className="px-4">Contact</h3>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
