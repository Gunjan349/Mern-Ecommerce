import React from "react";
import { IoIosSearch } from "react-icons/io";

const Search = (props) => {
  return (
    <>
      <div className="search bg-purple px-4 rounded-full flex items-center group w-full mr-10">
        <a className="btn" href="#">
          <IoIosSearch size={32} className="text-white" />
        </a>
        <input
          type="text"
          placeholder="Search Products..."
          value={props && props.search}
          onChange={(e) => props.handleSearch(e.target.value)}
          className="input border-none px-3 outline-0 bg-transparent transition-all ease-linear duration-300 placeholder-white text-white text-lg  sm:text-base"
        />
      </div>
    </>
  );
};

export default Search;
