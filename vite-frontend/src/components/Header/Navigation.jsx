import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import menuIcon from "/menu bar.png";
import closeIcon from "/close.png"
import "./styles/Navigation.css";

export const Navigation = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  const handleToggle = () => {
    setIsToggleOpen(!isToggleOpen);
  }

  const closeToggle = () => {
    setIsToggleOpen(false);
  }

  return (
    <>
    <div className="header grid grid-cols-2 items-center overflow-hidden fixed w-full z-10" style={{backgroundColor:"#353535"}}>
        <div className="logo">
            <img className="w-28 max-sm:w-24" src="./Academy logo.png" alt="Vekan Martial Arts Logo" />
        </div>

        <div className="justify-self-end md:hidden mr-2">
            <button onClick={handleToggle}>
              <img 
                className={`menu-icon ${isToggleOpen ? 'open' : 'close'}`} 
                src={isToggleOpen ? closeIcon : menuIcon} alt="menu-icon" 
              />
            </button>
        </div>

        {isToggleOpen && <div className="flex justify-center pb-2 w-screen md:hidden">
            <ul className="flex flex-col gap-5 justify-center items-center text-white max-sm:text-sm font-medium">
              <li>
                <Link onClick={reload} to={"/"}>Home</Link>
              </li>
              <li>
                <a onClick={closeToggle} href="#AboutUs">About Us</a>
              </li>
              <li>
                <a onClick={closeToggle} href="#ContactUs">Contact</a>
              </li>
            </ul>
        </div>}

        <div className="max-md:hidden justify-self-end mr-3">
          <ul className="flex gap-10 justify-center items-center text-white text-lg font-medium">
            <li>
              <Link onClick={()=>{
                if (window.location.pathname === "/") {
                  window.location.reload();
                }
              }} to={"/"}>Home</Link>
            </li>
            <li>
              <a href="#AboutUs" className="whitespace-nowrap scroll-smooth">About Us</a>
            </li>
            <li>
              <a href="#Contact">Contact</a>
            </li>
            <li>
              <button 
              className="px-5 py-2 rounded-lg whitespace-nowrap bg-black text-white font-bold transition duration-500 hover:text-[#000000] hover:bg-white" 
              onClick={() => handleNavigation('/JoinNow')}>
                Join Now
              </button>
            </li>
            <li>
              <button 
              className="px-5 py-2 rounded-lg whitespace-nowrap bg-black text-white font-bold transition duration-500 hover:text-[#000000] hover:bg-white" 
              onClick={() => handleNavigation('/Login')}>
                Login
              </button>
            </li>
          </ul>
        </div>
    </div>
    </>
  );
};
