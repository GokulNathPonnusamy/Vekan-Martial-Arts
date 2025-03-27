import React from 'react';
import { Carousel } from '../Carosuel/Carosuel';
import { AboutUs } from './AboutUs';
import { Courses } from '../Courses/Courses';
import { Booking } from '../Booking/Booking';
import { Map } from '../Map/Map';
import { Footer } from '../Footer/Footer';

export const Home = () => {
  return (
    <>
      <div className="w-[100%]">
        <Carousel />
        <AboutUs />
        <Courses />
        <Booking />
        <Map />
      </div>
      <Footer />
    </>
  )
}
