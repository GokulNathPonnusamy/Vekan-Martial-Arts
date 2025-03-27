import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Login Authentication/Auth';

export const StudentFeesController = () => {
  const { token } = useAuth();
  const [selectClass, setSelectClass] = useState("Karate Indoor");
  const [courseName, setCourseName] = useState(null);
  const [courseCategory, setCourseCategory] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [students, setStudents] = useState([]);
  const [payment, setPayment] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [error, setError] = useState(null);

  const handleClassChange = (e) => {
    setSelectClass(e.target.value);
  };
  
  const MonthYearDropdown = () => {
    const years = Array.from({ length: 15 }, (_, i) => currentYear - i);
      const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      
      return(
        <div className="flex gap-2">
          <select
            className="bg-[#4D4D4D] text-white text-[18px] py-1 px-3 rounded-lg"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          >
            {months.map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>

          <select
            className="bg-[#4D4D4D] text-white text-[18px] py-1 px-3 rounded-lg"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
      </div>
    );
  };

  const fetchPaymentDetails = async() => {
    if(!selectedYear || !selectedMonth){
      setError("Please select a year and month");
      return;
    }

    const apiUrl = `http://localhost:5000/api/admin/get-by-course-name/${encodeURIComponent(selectClass)}`;

    try{
      const courseResponse = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const courseData = courseResponse.data.course[0];
  
      if (courseData) {
        setCourseCategory(courseData.category);
        setCourseName(courseData.course_name);
        setCourseId(courseData.course_id);
      }

      const enrollmentsResponse = await axios.get(`http://localhost:5000/api/admin/get-by-course-id/${courseData.course_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      const enrollments = enrollmentsResponse.data.enrollments;
  
      if (enrollments.length > 0) {
        const studentPromises = enrollments.map(async (enrollment) => {
          const studentResponse = await axios.get(`http://localhost:5000/api/admin/students/${enrollment.student_id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
  
          const studentData = studentResponse.data.student[0];

          // const paymentDetail = await axios.get()
  
          return {
            ...studentData 
          };
        });
  
        const studentsList = await Promise.all(studentPromises);
        setStudents(studentsList);
      } else {
        setStudents([]);
      }
  
      setError(null);
    }

    catch(err){
      if (err.response && err.response.status === 404) {
        setPayment([]);
      } else {
        setError("Failed to fetch student data");
      }
    }
  }

  return (
    <>
    <div className="bg-[#212020] h-screen">
      <div className="flex justify-center pt-10 gap-5">
        <div>
          <label htmlFor="classes"></label>
          <select id="classes" name="classes" value={selectClass} onChange={handleClassChange} className="bg-[#4D4D4D] text-white text-[18px] py-1 px-10">
            <option value="Karate Indoor">Karate Indoor</option>
            <option value="Karate Outdoor">Karate Outdoor</option>
            <option value="Silambam Indoor">Silambam Indoor</option>
            <option value="Silambam Outdoor">Silambam Outdoor</option>
            <option value="Archery">Archery</option>
            <option value="Yoga">Yoga</option>
            <option value="Fitness Indoor">Fitness Indoor</option>
            <option value="Kids & Women Self Defence">Kids & Women Self Defence</option>
          </select>
        </div>

        <div>
          <MonthYearDropdown />
        </div>

        <button className="text-white bg-[#4D4D4D] px-6 py-1 text-[18px] rounded-md" onClick={fetchPaymentDetails}>Select</button>
      </div>
      
      <div className="pt-5">
        <table className="ml-8">
          <thead>
            <tr className="text-white text-center">
              <th className="px-11 py-2">Student ID</th>
              <th className="px-11 py-2">Name</th>
              <th className="px-11 py-2">Class</th>
              <th className="px-11 py-2">Class Type</th>
              <th className="px-11 py-2">Payment Method</th>
              <th className="px-11 py-2">Paid</th>
            </tr>
          </thead>

          <tbody className="bg-[#4D4D4D]">
            {students.map((student, index) => (<tr className="text-white text-center">
              <td className="px-11 py-2">{student.student_id}</td>
              <td className="px-11 py-2">{student.name}</td>
              <td className="px-11 py-2">{courseName}</td>
              <td className="px-11 py-2">{courseCategory}</td>
              <td className="px-11 py-2">Online</td>
              <td className="px-11 py-2">Offline</td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};
