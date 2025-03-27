import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube, FaEnvelope } from "react-icons/fa";

export const Footer = () => {
  return (
    <>
    <div className="w-[100%]" id="Contact">
      <div>
        <div className="bg-[#1D2939] lg:flex lg:justify-around">
          <div className="flex justify-center">
            <div className="w-[80%] md:w-[100%] flex justify-center items-center">
              <img className="w-28 lg:w-32" src="./Academy logo.png" alt="Vekan Martial Arts Logo" />
              <div>
                <h1 className="text-white text-xl lg:text-2xl font-bold">Vekan Martial Arts Sports Accademy</h1>
                <h3 className="text-white font-semibold text-lg lg:text-xl">Thiruvannamalai</h3>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center pb-5">
            <ul className="flex gap-10 max-lg:gap-5 justify-center items-center text-white">
              <li className="text-lg lg:text-xl font-semibold">
                <Link to={"/"}>Home</Link>
              </li>
              <li className="text-lg lg:text-xl font-semibold">
                <a href="#AboutUs">About Us</a>
              </li>
              <li className="text-lg lg:text-xl font-semibold">
                <a href="#ContactUs">Contact</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-[#101828]">
          <div className="mr-5 flex justify-center lg:justify-end gap-5 py-3">
            <a className="text-white text-xl lg:text-2xl" href="mailto:vekanmartialarts@gmail.com" target="_blank" rel="noopener noreferrer">
              <FaEnvelope />
            </a>
            <a className="text-white text-xl lg:text-2xl" href="https://www.facebook.com/vekanmartialarts?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a className="text-white text-xl lg:text-2xl" href="https://youtube.com/@vekanmartialarts6308?si=CBbikXn4RwiiTKXp" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </a>
            <a className="text-white text-xl lg:text-2xl" href="https://wa.me/9965212158" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp />
            </a>
            <a className="text-white text-xl lg:text-2xl" href="https://www.instagram.com/vekanmartialarts?igsh=YzVkODRmOTdmMw==" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Footer;