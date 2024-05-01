import React from "react";
import { CiSearch } from "react-icons/ci";
import Post from "../pages/Post";
import { Link } from "react-router-dom";
import ProfileBtn from "./ProfileBtn";

const Navbar = () => {
  const isAuthenticated = localStorage.getItem("auth-token");

  return (
    <div className="p-3 flex items-center justify-between bg-slate-400 top-0 sticky z-10">
      <div className="flex gap-2 items-center">
        <div>LOGO</div>
        <div className="hidden sm:flex bg-white border items-center rounded-md py-2 px-2 border-gray-300">
          <CiSearch size={23} />
          <input
            className="w-full px-2 placeholder-gray-400 text-gray-900 focus:outline-none sm:text-sm"
            type="text"
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          <>
            <div className="hidden sm:block">
              <Post />
            </div>
            <div className="block sm:hidden">
              <CiSearch size={23} />
            </div>
            <ProfileBtn />
          </>
        ) : (
          <>
            <div className="block sm:hidden">
              <CiSearch size={23} />
            </div>
            <div className="bg-blue-500 p-2 rounded-md">
              <Link to={"/login"}>Login</Link>
            </div>
            <div className="bg-blue-500 p-2 rounded-md">
              <Link to={"/register"}>Create Account</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
