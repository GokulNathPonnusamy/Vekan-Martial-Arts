import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { useNavigate } from 'react-router-dom';
import  mobileCourse  from "./Courses_Mobile.json";
import desktopCourse from "./Courses_Desktop.json";

export const Courses = () => {
  const navigate = useNavigate();
  const [flippedCards, setFlippedCards] = useState(Array(mobileCourse.length).fill(false));

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleFlip = (index) => {
    const updatedFlippedCards = [...flippedCards];
    updatedFlippedCards[index] = !updatedFlippedCards[index];
    setFlippedCards(updatedFlippedCards);
  };

  return (
    <>
    <div>
        <div className="md:hidden mt-5 flex flex-col justify-self-center">
            {mobileCourse.map((course, courseIndex) => (
                <ReactCardFlip key={courseIndex} flipDirection="horizontal" isFlipped={flippedCards[courseIndex]}>
                    <div className="max-md:w-[300px] max-md:h-[300px] w-[400px] h-[400px] cursor-pointer transition-transform duration-500 mb-5"
                    onClick={() => handleFlip(courseIndex)}>
                        <img className="w-full h-full object-cover" src={course.image} alt={course.name} />
                    </div>
            
                    <div className="max-md:w-[300px] max-md:h-[300px] w-[400px] h-[400px] bg-black flex flex-col justify-center items-center mb-5" onClick={() => handleFlip(courseIndex)}>
                        <h1 className="text-white uppercase underline text-2xl font-semibold text-center">{course.name}</h1>
                        <p className="text-white m-2 text-justify">{course.about_course}</p>
                        <button 
                        className="px-5 py-2 rounded-lg whitespace-nowrap text-[16px] bg-white text-black border-2 border-white font-bold transition duration-500 hover:text-white hover:bg-black" 
                        onClick={() => handleNavigation('/Login')}>
                            Login
                        </button>
                    </div>
                </ReactCardFlip>
            ))}
        </div>
          
        <div className="max-md:hidden">
          {desktopCourse
          .map((desCourse, desIndex) => (
            <div key={desIndex}>
              {desCourse.isleft && <div className="grid grid-flow-col m-7 mt-10">
                <div className="w-[300px] h-[300px]">
                  <img className="w-full h-full object-cover" src={desCourse.image} alt={desCourse.name} />
                </div>

                <div className="ml-6">
                  <h1 className="max-lg:text-xl text-2xl mb-2 font-extrabold uppercase underline text-end">{desCourse.name}</h1>
                  <p className="max-lg:text-lg text-xl text-justify" dangerouslySetInnerHTML={{__html: desCourse.about_course}} />
                  <button className="bg-[#212C4A] text-lg text-white font-bold border-2 border-[#212C4A] px-6 py-2 mt-5 rounded-lg transition duration-500 hover:bg-white hover:text-[#212C4A]" onClick={() => handleNavigation('/JoinNow')}>Join Now</button>
                </div>  
              </div>}

              {!desCourse.isleft && <div className="grid grid-flow-col m-7">
                <div className="mr-6">
                  <h1 className="max-lg:text-xl text-2xl mb-2 font-extrabold uppercase underline text-end">{desCourse.name}</h1>
                  <p className="max-lg:text-lg text-xl text-justify" dangerouslySetInnerHTML={{__html: desCourse.about_course}} />
                  <div className="justify-self-end">
                    <button className="bg-[#212C4A] text-lg text-white font-bold border-2 border-[#212C4A] px-6 py-2 mt-5 rounded-lg transition duration-500 hover:bg-white hover:text-[#212C4A]" onClick={() => handleNavigation('/JoinNow')}>Join Now</button>
                  </div>
                </div>  

                <div className="w-[300px] h-[300px]">
                  <img className="w-full h-full object-cover" src={desCourse.image} alt={desCourse.name} />
                </div>
              </div>}
            </div>
          ))}

          
        </div>
    </div>
    </>
  );
};