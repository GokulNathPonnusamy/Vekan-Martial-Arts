import React from "react";

export const Map = () => {
  const mapStyles = { height: "400px", width: "100%" };
  const defaultCenter = { lat: 40.712776, lng: -74.005974 };

  return (
    <>
    <div className="max-lg:hidden w-full h-[75vh] flex justify-center items-center bg-[#D9D9D9]">
        <iframe 
            className="w-[95vw]"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3899.0660300138848!2d79.0683902097768!3d12.24380843036824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bacc13f284b76b5%3A0xe15f5077f5212025!2sVekan%20Martial%20Arts%20Sports%20Academy!5e0!3m2!1sen!2sin!4v1729949293755!5m2!1sen!2sin" width="600" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade">
        </iframe>
    </div>
    </>
  );
};