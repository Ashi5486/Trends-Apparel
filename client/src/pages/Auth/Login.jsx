// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import axios from 'axios';
// import 'react-toastify/dist/ReactToastify.css';

// const Login = () => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const togglePasswordVisibility = () => {
//     setPasswordVisible((prev) => !prev);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { email, password } = formData;

//     if (!email || !password) {
//       toast.error('All fields are required!');
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await axios.post(
//         'http://localhost:5000/api/auth/login',
//         { email, password },
//         { withCredentials: true }
//       );

//       if (response.status === 200) {
//         toast.success('Login successful!');
//         navigate('/dashboard');
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Login failed!');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Left Side - Image */}
//       <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gray-100 p-10">
//         <img src="/images/Img2.png" alt="Login Visual" className="w-90" />
//       </div>

//       {/* Right Side - Form */}
//       <div className="flex items-center justify-center w-full md:w-1/2 bg-white font-sans px-4">
//         <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
//           <h2 className="text-2xl font-semibold text-gray-800 text-center">
//             Welcome to Trends Apparel! <span>👋🏻</span>
//           </h2>
//           <p className="text-sm text-gray-500 text-center mt-2">
//             Please sign in to your account and start the adventure
//           </p>

//           <form onSubmit={handleSubmit} className="mt-6 space-y-4">
//             {/* Email Field */}
//             <div>
//               <label className="text-sm text-gray-700">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="admin@gmail.com"
//                 className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//               />
//             </div>

//             {/* Password Field */}
//             <div className="relative">
//               <label className="text-sm text-gray-700">Password</label>
//               <input
//                 type={passwordVisible ? 'text' : 'password'}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="••••••"
//                 className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//               />
//               <button
//                 type="button"
//                 onClick={togglePasswordVisibility}
//                 className="absolute top-9 right-3 text-gray-500"
//               >
//                 {passwordVisible ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>

//             {/* Options */}
//             <div className="flex items-center justify-between text-sm mt-1">
//               <label className="flex items-center gap-2 text-gray-600">
//                 <input type="checkbox" className="accent-purple-500" />
//                 Remember me
//               </label>
//               <Link to="/forgot-password" className="text-purple-600 hover:underline">
//                 Forgot Password?
//               </Link>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 rounded-md transition duration-200"
//             >
//               {loading ? 'Logging in...' : 'Login'}
//             </button>
//           </form>

//           {/* Signup Link */}
//           <p className="text-center text-sm text-gray-600 mt-4">
//             Don’t have an account?{' '}
//             <Link to="/signup" className="text-purple-600 hover:underline">
//               Sign Up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


// File: src/pages/Login.jsximport React, { useState } from 'react';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'email' && !validateEmail(value)) {
      setEmailError('The Email field must be a valid email');
    } else {
      setEmailError('');
    }
  };

  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Validate fields
    if (!email || !password) {
      toast.error('All fields are required!');
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('The Email field must be a valid email');
      return;
    }

    try {
      setLoading(true);

      // Make API request to login
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      // Store user data, token, and userId in localStorage upon successful login
      localStorage.setItem('user', JSON.stringify(res.data.user)); // Store user info
      localStorage.setItem('token', res.data.token); // Optionally store the token
      localStorage.setItem('userId', res.data.user.id); // Store userId (adjust based on API response)

      toast.success(res.data.message || 'Login successful!', {
        onClose: () => navigate('/dashboard'), // Navigate to dashboard after login
        autoClose: 1500,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-3/5 bg-gray-100 p-10 relative flex justify-center items-center">
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <img src="/img1.png" alt="Logo" className="w-10 h-8" />
          <h1 className="text-xl font-bold text-gray-600">Trends Apparel</h1>
        </div>
        <img
          src="/images/Img2.png"
          alt="Login Visual"
          className="w-[90%] max-w-[650px]"
        />
      </div>

      <div className="w-full md:w-2/5 bg-white flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md p-6 md:p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-600 text-center">
            Welcome to <span className="font-bold">Trends Apparel!</span> 👋🏻
          </h2>
          <p className="text-lg text-gray-500 text-center mt-2">
            Please sign in to your account and start the adventure
          </p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${emailError ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="admin@gmail.com"
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>
            <div className="relative">
              <label className="text-sm text-gray-700">Password</label>
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pr-10 pl-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="••••••"
              />
              <div className="absolute top-[37px] right-0 h-[40px] w-[40px] flex items-center justify-center">
                <button type="button" onClick={togglePasswordVisibility}>
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-md"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-indigo-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;




// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import axios from "axios";
// import "react-toastify/dist/ReactToastify.css";


// const Login = () => {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { email, password } = formData;
//         console.log({ email, password });
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", formData, {
//         withCredentials: true
//       });
      
//       if (res.status === 200) {
//         toast.success("Login successful!");
//         navigate("/dashboard");
//       }
//     } catch (error) {
//         console.error(error);
//       toast.error(error.response?.data?.message || "Login failed");
//     }
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { email, password } = formData;
//     console.log({ email, password });
  
//     if (!email || !password) {
//       toast.error("All fields are required");
//       return;
//     }
  
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         credentials: "include",
//         body: JSON.stringify({ email, password })
//       });
  
//       const data = await res.json();
  
//       if (!res.ok) {
//         toast.error(data.message || "Login failed");
//         return;
//       }
  
//       toast.success(data.message);
//       navigate("/dashboard");
//     } catch (err) {
//       console.error(err);
//       toast.error("Something went wrong");
//     }
//   };
  
//   return (
//     <div className="flex min-h-screen">
//       {/* Left Side - Image */}
//       <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gray-100 p-10">
//         <img src="/images/Img2.png" alt="Login Visual" className="w-90" />
//       </div>

//       {/* Right Side - Login Form */}
//       <div className="flex justify-center items-center w-full md:w-1/2 p-10 bg-white mb-20">
//         <div className="w-full max-w-md bg-white p-3 rounded-lg shadow-lg">
//           <div className="mb-6 text-center">
//             <h1 className="text-2xl font-bold text-gray-800">Welcome to Trends Apparel! 👋🏻</h1>
//             <p className="text-gray-500 text-sm mt-2">
//               Please sign in to your account and start the adventure.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit}>
//             {/* Email */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>

//             {/* Password */}
//             <div className="mb-4 relative">
//               <label className="block text-sm font-medium text-gray-700">Password</label>
//               <input
//                 type={passwordVisible ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter your password"
//                 required
//               />
//               <span
//                 className="absolute top-9 right-3 cursor-pointer"
//                 onClick={togglePasswordVisibility}
//               >
//                 {passwordVisible ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>

//             {/* Remember Me & Forgot Password */}
//             <div className="flex justify-between items-center mb-4">
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   name="rememberMe"
//                   checked={formData.rememberMe || false}
//                   onChange={handleChange}
//                   className="mr-2"
//                 />
//                 <span className="text-sm text-gray-700">Remember Me</span>
//               </label>
//               <Link to="/forgot-password" className="text-sm text-blue-500">
//                 Forgot Password?
//               </Link>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
//             >
//               Login
//             </button>
//           </form>

//           {/* Signup Redirect */}
//           <p className="text-center text-sm mt-4">
//             Don't have an account?{" "}
//             <Link to="/signup" className="text-blue-500">
//               Sign Up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


