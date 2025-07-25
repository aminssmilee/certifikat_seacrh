// eslint-disable-next-line no-unused-vars
import React from "react";

const Navigation = () => {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 bg-black p-4 rounded-full shadow-lg max-w-4xl w-[90%] z-50">
      <ul className="flex justify-center gap-10 list-none m-0 p-0">
        <li>
          <a href="#home" className="text-white text-base hover:text-jeruk transition font-semibold">
            Sertifikat
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
