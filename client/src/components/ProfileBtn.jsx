import React, { useState } from "react";
import { useUser } from "../context/User";
import { CgProfile } from "react-icons/cg";
import Post from "../pages/Post";
import { FaBloggerB } from "react-icons/fa";
import { MdLibraryBooks } from "react-icons/md";

const ProfileBtn = () => {
  const [isOpen, setIsOpen] = useState(false);

  const user = useUser();

  const toggleMenu = (e) => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {user.userInfo && (
        <button
          type="button"
          onClick={toggleMenu}
          className="py-2 px-4 rounded focus:outline-none"
        >
          <img
            src={user.userInfo.avatar}
            className="w-8 h-8 rounded-2xl"
            alt=""
          />
        </button>
      )}

      {/* Menu items */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10">
          <ul className="cursor-pointer">
            <li className="py-2 px-4 hover:bg-gray-100 sm:hidden">
              <div>
                <Post />
              </div>
            </li>
            <li className="py-2 px-4 hover:bg-gray-100">
              <div className="flex items-center gap-3">
                <CgProfile size={20} />
                <p>Profile</p>
              </div>
            </li>
            <li className="py-2 px-4 hover:bg-gray-100">
              <div className="flex items-center gap-3">
                <FaBloggerB size={20} />
                <p>Blogs</p>
              </div>
            </li>
            <li className="py-2 px-4 hover:bg-gray-100">
              <div className="flex items-center gap-3">
                <MdLibraryBooks size={20} />
                <p>Saved</p>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileBtn;
