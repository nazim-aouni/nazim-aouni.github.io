import React from "react";
import { Link } from 'react-router-dom';
import { IoArrowBackSharp } from "react-icons/io5";


const NavHeader = () => {
 return (
    <header className="sticky top-0 z-50 flex items-center bg-white shadow px-4 py-3">
      {/* Back button on the left */}
      <Link
        to="/"
        className="inline-flex items-center justify-center p-2 rounded-full bg-gray-100 text-blue-800 hover:bg-gray-200 hover:text-blue-800 transition shadow-md"
      >
        <IoArrowBackSharp className="text-2xl" />
      </Link>

      {/* Title centered */}
      <h1 className="flex-1 text-center font-bold text-xl text-gray-800">
        Nazim Aouni Blog
      </h1>
    </header>
  );
};
export default NavHeader;
