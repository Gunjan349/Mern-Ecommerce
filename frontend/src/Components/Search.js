import React from "react";
import { IoIosSearch } from "react-icons/io";

const Search = (props) => {
  return (
    <>
      <div className="search ml-20 lg:ml-4 mr-24 md:mr-16 bg-purple px-4 py-2 rounded-full flex items-center group">
        <a className="btn" href="#">
          <IoIosSearch size={32} className="text-white" />
        </a>
        <input
          type="text"
          placeholder="Search Products..."
          value={props && props.search}
          onChange={(e) => props.handleSearch(e.target.value)}
          className="input border-none px-1 outline-0 bg-transparent transition-all ease-linear duration-300 placeholder-white text-white text-lg  sm:text-base"
        />
      </div>
    </>
  );
};

export default Search;
