import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../Login Authentication/Auth';
import AcademyLogo from '/Academy logo.png';

export const Login = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {login} = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("All fields are required");
      return; 
    }

    const isAdmin = (username === "21vma001" || username === "21VMA001");
    const loginURL = isAdmin ? "http://localhost:5000/api/admin/login" : "http://localhost:5000/api/student/login";
    const requestData = { username, password };

    try {
        const response = await axios.post(loginURL, requestData, {
          headers: { "Content-Type": "application/json" },
        });
    
        if (response.data.jwtToken) {
          if(isAdmin){
            login(response.data.jwtToken);
          }
          else{
            login(response.data.jwtToken);
          }
          navigate(isAdmin ? "/admin" : "/student");
        } else {
          setError("Invalid username or password");
        }
      } 
      catch (err) {
        if (err.response) {
          if (err.response.status === 400) {
            console.log("Invalid username or password"); 
            setError("Invalid username or password");
          } 
          else {
            setError("An error occurred while logging in"); 
          }
        } else {
          setError("An error occurred while logging in");
        }
      }
  };

  return (
    <>
    <div className="grid h-screen overflow-hidden max-lg:grid-rows-2 lg:grid-cols-2">
        <div className="bg-black pb-5">
          <div className="w-28 h-28 ml-[-8%] mt-[-5%] border-[4px] rounded-[50%] border-[#383839] overflow-hidden"></div>
          <img className="w-56 lg:w-[32vw] justify-self-center" src="./login animation.png" alt="animation" />
          <div className="justify-self-center">
            <div className="w-[80vw] lg:w-[30vw]">
              <h1 className="text-white text-xl font-bold ml-5">Welcome to Vekan Martial Arts and Sports Academy</h1>
              <p className="text-white text-sm font-thin ml-5">Just login your page and explore your profile</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <img src={AcademyLogo} alt="Vekan Martial Arts Sports Acamedy Logo" />
            <form onSubmit={handleLogin}>
            <div className="w-[80vw] lg:w-[40vw]">
                <label htmlFor="loginId" className="text-xl font-semibold">Enter your ID</label>
                <br />
                <input className="border-2 bg-[#CBD5E1] outline-none w-full my-2 p-2" type="text" id="loginId" onChange={e => setUserName(e.target.value)} />
                <br />
                <label htmlFor="password" className="text-xl font-semibold">Password</label>
                <br />
                <input className="border-2 bg-[#CBD5E1] outline-none w-full my-2 p-2" type="password" id="password" onChange={e => setPassword(e.target.value)} />
                <br />
                <div className="flex justify-between mb-2">
                    <div className="flex gap-1">
                        <input type="checkbox" className="cursor-pointer" id="rememberMe" />
                        <label htmlFor="rememberMe" className="cursor-pointer">Remember me</label>
                    </div>
                    <p className="text-[#2563EB] font-semibold cursor-pointer">Forgot Password?</p>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button className="w-full bg-[#2563EB] text-lg py-2 text-white font-bold rounded-md border-2 transition duration-500 border-[#2563EB] hover:bg-[white] hover:text-[#2563EB]">Login</button>
            </div>
            </form>
        </div>
    </div>
    </>
  )
}
