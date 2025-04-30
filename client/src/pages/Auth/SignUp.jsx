// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const SignUp = () => {
//   const navigate = useNavigate();
//   const [values, setValues] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleChange = (e) => {
//     setValues({ ...values, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { name, email, password, confirmPassword } = values;

//     if (!name || !email || !password || !confirmPassword) {
//       toast.error("All fields are required!");
//       return;
//     }

//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match!");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/auth/signup",
//         {
//           name,
//           email,
//           password,
//           confirmPassword,
//         },
//         {
//           withCredentials: true,
//         }
//       );

//       if (res.status === 201) {
//         toast.success("Signup successful! Please login.", {
//           onClose: () => navigate("/login"),
//           autoClose: 2000,
//         });
//       }
//     } catch (error) {
//       const message = error.response?.data?.message || "Signup failed!";
//       toast.error(message);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-white">
//       <div className="hidden md:block w-1/2">
//         <img
//           src="/images/Img1.png"
//           alt="Sign Up"
//           className="w-full mt-20 object-cover"
//         />
//       </div>
//       <div className="flex justify-center items-center w-full md:w-1/2 p-8">
//         <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-semibold text-gray-800 text-center mt-4">
//             Sign Up
//           </h2>
//           <form onSubmit={handleSubmit} className="mt-6 space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={values.name}
//                 onChange={handleChange}
//                 className="mt-1 p-2 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
//                 placeholder="Enter your name"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={values.email}
//                 onChange={handleChange}
//                 className="mt-1 p-2 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
//                 placeholder="Enter your email"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 value={values.password}
//                 onChange={handleChange}
//                 className="mt-1 p-2 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
//                 placeholder="Enter your password"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Confirm Password
//               </label>
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 value={values.confirmPassword}
//                 onChange={handleChange}
//                 className="mt-1 p-2 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
//                 placeholder="Confirm your password"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full p-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-all duration-200"
//             >
//               Sign Up
//             </button>
//           </form>
//           <p className="text-sm text-center mt-4">
//             Already have an account?{" "}
//             <Link to="/login" className="text-indigo-500 hover:underline">
//               Login
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;



import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = values;

    if (!name || !email || !password || !confirmPassword) {
      toast.error('All fields are required!');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/signup',
        {
          name,
          email,
          password,
          confirmPassword,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 201) {
        toast.success('Signup successful! Please login.', {
          onClose: () => navigate('/login'),
          autoClose: 2000,
        });
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Signup failed!';
      console.log(error);
      toast.error(message);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="hidden md:block w-1/2">
        <img
          src="/images/Img1.png"
          alt="Sign Up"
          className="w-full mt-20 object-cover"
        />
      </div>
      <div className="flex justify-center items-center w-full md:w-1/2 p-8">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mt-4">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
                placeholder="Enter your password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
                placeholder="Confirm your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 rounded-md mt-4"
            >
              Sign Up
            </button>
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
