import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../Login Authentication/Auth";

export const StudentDetailsController = () => {
  const { token } = useAuth();
  const [selectClass, setSelectClass] = useState("Karate Indoor");
  const [courseName, setCourseName] = useState(null);
  const [courseCategory, setCourseCategory] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  };
  
  
  const handleClassChange = (e) => {
    setSelectClass(e.target.value);
  };

  const fetchCoursesByName = async () => {
    if (!selectClass) {
      setError("Please select a class");
      return;
    }
  
    const apiUrl = `http://localhost:5000/api/admin/get-by-course-name/${encodeURIComponent(selectClass)}`;
  
    try {
      const courseResponse = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const courseData = courseResponse.data.course[0];
  
      if (courseData) {
        setCourseCategory(courseData.category);
        setCourseName(courseData.course_name);
        setCourseId(courseData.course_id);
      }
  
      // Fetch enrollments based on course_id
      const enrollmentsResponse = await axios.get(`http://localhost:5000/api/admin/get-by-course-id/${courseData.course_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      const enrollments = enrollmentsResponse.data.enrollments;
  
      if (enrollments.length > 0) {
        // Fetch student details for all enrollments
        const studentPromises = enrollments.map(async (enrollment) => {
          const studentResponse = await axios.get(`http://localhost:5000/api/admin/students/${enrollment.student_id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
  
          const studentData = studentResponse.data.student[0];
  
          return {
            ...studentData,               // Student details
            enrollment_date: enrollment.enrollment_date // Enrollment date
          };
        });
  
        const studentsList = await Promise.all(studentPromises);
        setStudents(studentsList);
      } else {
        setStudents([]);
      }
  
      setError(null);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setStudents([]);
      } else {
        setError("Failed to fetch student data");
      }  
    }
  };  

  const toggleStudentStatus = async (studentId, currentStatus, token, setStudents) => {
    try {
        const newStatus = !currentStatus;

        const response = await axios.put(
            `http://localhost:5000/api/admin/update-student-status/${studentId}`,
            { active_status: newStatus }, // Make sure this matches your backend field
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        if (response.status === 200) {
            setStudents((prevStudents) =>
                prevStudents.map((student) =>
                    student.student_id === studentId
                        ? { ...student, active_status: newStatus } 
                        : student
                )
            );
        }
    } catch (error) {
        console.error("Failed to update student status", error);
        alert("Error updating student status");
    }
  };


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
        <button className="text-white bg-[#4D4D4D] px-6 py-1 text-[18px] rounded-md" onClick={fetchCoursesByName}>Select</button>
      </div>

      {students.length > 0 ? (<div className="pt-5">
        <table className="ml-8">
          <thead>
            <tr className="text-white text-center">
              <th className="px-11 py-2">Student ID</th>
              <th className="px-11 py-2">Name</th>
              <th className="px-11 py-2">Class</th>
              <th className="px-11 py-2">Class Type</th>
              <th className="px-11 py-2">Join Date</th>
              <th className="px-11 py-2">Action</th>
            </tr>
          </thead>

          <tbody className="bg-[#4D4D4D]">
            {students.map((student, index) => (
              <tr key={index} className="text-white text-center">
                <td className="px-11 py-2">{student.student_id}</td>
                <td className="px-11 py-2">{student.name}</td>
                <td className="px-11 py-2">{courseName}</td>
                <td className="px-11 py-2">{courseCategory}</td>
                <td className="px-11 py-2">{formatDate(student.enrollment_date)}</td>
                <td className={`px-11 py-2`}>
                <button
                  onClick={() => toggleStudentStatus(student.student_id, student.student_active, token, setStudents)}
                  className={`cursor-pointer ${
                    student.student_active ? "text-[#00EC14]" : "text-[#FD3A3A]"
                  }`}
                >
                  {student.student_active ? "Active" : "Inactive"}
                </button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>) 
      :(
        <div className="text-white text-center pt-10">No students found for the selected class</div>
      )}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
    </>
  )
}
