import React, { useEffect, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';

const imagesArr = [
  {
    name: "FITNESS",
    image: "/slide/Gym.png",
    writings: "Join fitness class to make your body and mental health stronger!"
  },
  {
    name: "YOGA",
    image: "/slide/Yoga.png",
    writings: "Join yoga class to make your life peaceful!"
  },
  {
    name: "KARATE",
    image: "/slide/Karathe.png",
    writings: "Join karate class to defend yourself!"
  },
  {
    name: "ARCHERY",
    image: "/slide/Archary.png",
    writings: "Join archery class to learn a new skill in your life!"
  }
];

export const Carousel = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  const [slideIndex, setSlideIndex] = useState(0);
  const [transition, setTransition] = useState('fade-in'); 

  const prevIndex = () => {
    const isFirstSlide = slideIndex === 0;
    const newIndex = isFirstSlide ? imagesArr.length - 1 : slideIndex - 1;
    setTransition('fade-out'); 
    setTimeout(() => {
      setSlideIndex(newIndex);
      setTransition('fade-in'); 
    }, 300);
  };

  const nextIndex = () => {
    const isLastIndex = slideIndex === imagesArr.length - 1;
    const newIndex = isLastIndex ? 0 : slideIndex + 1;
    setTransition('fade-out'); 
    setTimeout(() => {
      setSlideIndex(newIndex);
      setTransition('fade-in'); 
    }, 300);
  };

  useEffect(()=>{
    const interval = setInterval(() => {
        nextIndex();
    }, 3000);

    return () => clearInterval(interval);
  }, [slideIndex]);

  const gotoSlide = (imgIndex) => {
    setTransition('fade-out'); 
    setTimeout(() => {
      setSlideIndex(imgIndex);
      setTransition('fade-in'); 
    }, 300); 
  };

  return (
    <>
    <div className="mt-[-5px] flex w-full justify-center relative" style={{backgroundColor:"#353535"}}>
      <div className="mt-28">
        <img
          className={`max-2xl:w-[95vw] lg:h-[540px] transition-opacity duration-300 ${transition === 'fade-in' ? 'opacity-100' : 'opacity-0'}`}
          src={imagesArr[slideIndex].image}
          alt={imagesArr[slideIndex].name}
        />

        <div className="max-md:hidden absolute left-[50%] translate-x-[-50%] bottom-[14%]">
            <h1 className="text-white text-center font-black max-lg:text-4xl lg:text-8xl">{imagesArr[slideIndex].name}</h1>
            <p className="text-white text-center font-medium max-lg:text-lg lg:text-xl">{imagesArr[slideIndex].writings}</p>
        </div>

        <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactLeft onClick={prevIndex} size={30} />
        </div>
        <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactRight onClick={nextIndex} size={30} />
        </div>

        <div className="absolute left-[50%] bottom-0 translate-x-[-50%] text-white flex justify-center">
          {imagesArr.map((img, imgIndex) => (
            <div key={imgIndex} className="text-2xl cursor-pointer" onClick={() => gotoSlide(imgIndex)}>
              <span className={`text-[80px] text-center ${slideIndex === imgIndex ? 'font-bold' : ''} w-9 inline-block text-center`}>-</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="bg-[#353535] pb-4 md:hidden">
        <h1 className="text-center text-4xl text-white pt-3 font-anton">“Become the best version of </h1>
        <h1 className="text-center font-inline_one text-8xl text-[red]">YOURSELF”</h1>

        <div className="text-center">
            <ul>
                <li>
                    <button 
                    className="px-5 py-2 rounded-lg whitespace-nowrap bg-black text-white font-bold transition duration-500 hover:text-[#000000] hover:bg-white" 
                    onClick={() => handleNavigation('/JoinNow')}>
                        Join Now
                    </button>
                </li>
                <p className="text-white text-lg my-2">Already have an Account?</p>
                <li>
                    <button 
                    className="px-5 py-2 rounded-lg bg-black text-white font-bold transition duration-500 hover:text-[#000000] hover:bg-white" 
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
