import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../Login Authentication/Auth';
import AcademyLogo from '/Academy logo.png';
import Footer from '../Footer/Footer';

export const Student = () => {
  const { token } = useAuth();
  const [studentData, setStudentData] = useState(null);
  const [studentPhoto, setStudentPhoto] = useState(null);
  const [courseName, setCourseName] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudentData = async () => {
        try{
            if (!token) {
                setError('You are not logged in.');
                return;
            }
            const response = await axios.get('http://localhost:5000/api/student/student-detail', {
                headers : {Authorization: `Bearer ${token}`}
            });
            setStudentData(response.data);

            const studentId = response.data.student_info.student_id;
            fetchStudentCertificates(studentId);

            const studentPhotoResponse = await axios.get(`http://localhost:5000/api/student/get-student-photo/${studentId}`,{
                headers : {Authorization: `Bearer ${token}`},
                responseType: 'blob'
            });
            const studentPhotoURL = URL.createObjectURL(studentPhotoResponse.data);
            setStudentPhoto(studentPhotoURL);

            const courseResponse = await axios.get(' http://localhost:5000/api/student/enrollments', {
                headers : {Authorization: `Bearer ${token}`}
            });
            setCourseName(courseResponse.data.enrollments[0]?.course_name || "No Course Found");
        }
        catch(err){
            setError("Failed to fetch student data");
            console.error(err);
        }
    };
    fetchStudentData();
  },[token]);

  const fetchStudentCertificates = async (studentId) => {
    try {
        const certificateResponse = await axios.get(`http://localhost:5000/api/student/certificate-detail/${studentId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setCertificates(certificateResponse.data.certificates || []);
    } catch (err) {
        if (err.response && err.response.status === 404) {
            setCertificates([]); 
            return;
        }
        console.error("Failed to fetch certificates", err);
    }
  };

  useEffect(() => {
    if (studentData) {
    }
  }, [studentData]);

  if(!studentData){
    return <><div className="text-black pt-28 text-center text-2xl font-bold">Loading...</div></>;
  }

  const {student_id, name, dob, email, father_name, father_occupation, father_mobile_no,mother_name, mother_occupation, mother_mobile_no, doj} = studentData.student_info;

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString();
  };

  const formattedDob = formatDate(dob);
  const formattedDoj = formatDate(doj);

  const handleDownload = (cert) => {
    if (!cert.image || !cert.image.startsWith("data:image/jpeg;base64,")) {
        console.error("Invalid Base64 data");
        return;
    }

    // Convert Base64 to a Blob
    const byteCharacters = atob(cert.image.split(",")[1]); // Decode Base64 (only the actual image data)
    const byteNumbers = new Uint8Array(byteCharacters.length);
    
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    
    const blob = new Blob([byteNumbers], { type: "image/jpeg" });

    // Create a download link
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${cert.certificateName}.jpg`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
        {!error && <div>
            <div className="flex w-[100%] justify-between items-center">
                <div className="flex items-center">
                    <img className="w-16 md:w-20" src="./Photos_Profile/karate.png" alt="karate" />
                    <h1 className="text-xl md:text-2xl font-bold">{courseName}</h1>
                </div>
                <img src={AcademyLogo} alt="Vekan Martial Arts Sports Acamedy Logo" />
            </div>

            <div className="md:hidden flex justify-around py-3">
                <h1 className="text-xl font-semibold">Student ID</h1>
                <h1 className="text-xl font-semibold text-[#14B81B]">{student_id}</h1>
            </div>

            <div className="justify-self-center mb-4">
                <img className="rounded-[50%]" src={studentPhoto} alt="photo" />
            </div>

            <div className="md:bg-[#F5F5F5] md:mx-10 md:py-3 md:rounded-3xl">
                <div className="max-md:hidden grid grid-cols-2 gap-2 mx-12 py-3">
                    <div className="flex gap-10">
                        <h1 className="text-lg md:text-2xl font-semibold">Student ID</h1>
                        <h1 className="text-lg md:text-2xl font-semibold text-[#14B81B]">{student_id}</h1>
                    </div>
                    <h1 className="text-lg md:text-2xl font-bold">{formattedDoj}</h1>
                </div>

                <div className="md:hidden flex justify-between gap-2 mx-12 py-3">
                    <h1 className="text-xl md:text-2xl font-medium">D.O.J</h1>
                    <h1 className="text-xl md:text-2xl font-bold">{formattedDoj}</h1>
                </div>

                <div className="flex justify-between md:grid md:grid-cols-2 gap-2 mx-12 py-3">
                    <h1 className="text-xl md:text-2xl font-medium">Name</h1>
                    <h1 className="text-xl md:text-2xl font-bold">{name}</h1>
                </div>

                <div className="flex justify-between md:grid md:grid-cols-2 gap-2 mx-12 py-3">
                    <h1 className="text-xl md:text-2xl font-medium">Father Name</h1>
                    <h1 className="text-xl md:text-2xl font-bold">{father_name}</h1>
                </div>

                <div className="flex justify-between md:grid md:grid-cols-2 gap-2 mx-12 py-3">
                    <h1 className="text-xl md:text-2xl font-medium">Mother Name</h1>
                    <h1 className="text-xl md:text-2xl font-bold">{mother_name}</h1>
                </div>

                <div className="flex justify-between md:grid md:grid-cols-2 gap-2 mx-12 py-3">
                    <h1 className="text-xl md:text-2xl font-medium">D.O.B</h1>
                    <h1 className="text-xl md:text-2xl font-bold">{formattedDob}</h1>
                </div>

                <div className="flex justify-between md:grid md:grid-cols-2 md:gap-2 gap-7 mx-12 py-3">
                    <h1 className="text-xl md:text-2xl font-medium">Email</h1>
                    <h1 className="text-xl md:text-2xl font-bold break-all">{email}</h1>
                </div>

                <div className="flex justify-between md:grid md:grid-cols-2 gap-2 mx-12 py-3">
                    <h1 className="text-xl md:text-2xl font-medium">Father Occupation</h1>
                    <h1 className="text-xl md:text-2xl font-bold">{father_occupation}</h1>
                </div>

                <div className="flex justify-between md:grid md:grid-cols-2 gap-2 mx-12 py-3">
                    <h1 className="text-xl md:text-2xl font-medium">Mother Occupation</h1>
                    <h1 className="text-xl md:text-2xl font-bold">{mother_occupation}</h1>
                </div>

                <div className="flex justify-between md:grid md:grid-cols-2 gap-2 mx-12 py-3">
                    <h1 className="text-xl md:text-2xl font-medium">Father Mobile No.</h1>
                    <h1 className="text-xl md:text-2xl font-bold">{father_mobile_no}</h1>
                </div>

                <div className="flex justify-between md:grid md:grid-cols-2 gap-2 mx-12 py-3">
                    <h1 className="text-xl md:text-2xl font-medium">Mother Mobile No.</h1>
                    <h1 className="text-xl md:text-2xl font-bold">{mother_mobile_no}</h1>
                </div>
            </div>

            <div className="pl-12">
                <h1 className="text-xl md:text-2xl font-bold">Certificates</h1>
                {certificates && certificates.length > 0 ? (
                    certificates.map((cert, index) => (
                        <button
                            key={index}
                            onClick={() => handleDownload(cert)}
                            className="bg-[#F3F3F3] flex text-xl md:text-2xl gap-5 my-2 px-5 py-1 rounded-lg"
                        >
                            {cert.certificateName}
                            <p className="text-[#3273FE] text">Download</p>
                            <img className="w-7 h-7" src="./Photos_Profile/download_logo.png" alt="download" />
                        </button>
                    ))
                ) : (
                    <p className="text-lg text-gray-500">No Certificates Available</p>
                )}
            </div>
            <Footer />
        </div>}
    </>
  )
}
