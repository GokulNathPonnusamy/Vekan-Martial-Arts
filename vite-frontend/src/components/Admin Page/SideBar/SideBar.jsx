import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AcademyLogo from "/public/Academy logo.png";
import { StudentDetailsController } from "../AdminControllers/StudentDetailsController";
import { StudentFeesController } from "../AdminControllers/StudentFeesController";
import { EventDetailsController } from "../AdminControllers/EventDetailsController";
import { AcademicInformationController } from "../AdminControllers/AcademicInformationController";
import { AddStudentController } from "../AdminControllers/AddStudentController";

export const SideBar = () => {
  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [activePage, setActivePage] = useState("StudentDetails"); 

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 1024);
    
    handleResize(); 
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigation = (path, page) => {
    if (path === "/logout") {
      localStorage.removeItem("token");
      sessionStorage.clear();
      navigate("/");
    } else {
      setActivePage(page); 
    }
  };

  return (
    <div className="flex h-screen w-screen">
      {isSmallScreen ? (
        <div className="h-screen flex justify-center items-center bg-gray-800 text-white text-2xl font-bold p-4">
          This application is only accessible on a laptop or desktop.
        </div>
      ) : (
        <>
          <div className="h-screen bg-[#313131] w-[25%] flex flex-col justify-start items-center">
            <img className="w-[10rem]" src={AcademyLogo} alt="Academy Logo" />
            <ul className="w-[220px]">
              {[
                { path: "/student_details", label: "Student Details", page: "StudentDetails" },
                { path: "/student_fees", label: "Student Fees", page: "StudentFees" },
                { path: "/event_details", label: "Event Details", page: "EventDetails" },
                { path: "/academic_information", label: "Academic Information", page: "AcademicInformation" },
                { path: "/add_student", label: "Add Student", page: "AddStudent" },
              ].map(({ path, label, page }) => (
                <li key={path} className="my-5">
                  <button
                    className={`w-full py-1 text-[16px] font-semibold rounded-md ${
                      activePage === page ? "bg-[#DCDCDC] text-black" : "bg-[#4D4D4D] text-white"
                    }`}
                    onClick={() => handleNavigation(path, page)}
                  >
                    {label}
                  </button>
                </li>
              ))}
              <li className="mt-20">
                <button
                  className="bg-[#4D4D4D] text-white w-full py-1 text-[16px] font-semibold rounded-md"
                  onClick={() => handleNavigation("/logout")}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>

          <div className="flex-grow">
            {activePage === "StudentDetails" && <StudentDetailsController />}
            {activePage === "StudentFees" && <StudentFeesController />}
            {activePage === "EventDetails" && <EventDetailsController />}
            {activePage === "AcademicInformation" && <AcademicInformationController/>}
            {activePage === "AddStudent" && <AddStudentController />}
          </div>
        </>
      )}
    </div>
  );
};
