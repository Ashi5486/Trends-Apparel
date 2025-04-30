// // import axios from "axios";
// // import { useEffect } from "react";
// // import { useNavigate } from "react-router-dom";

// // const base_url = import.meta.env.VITE_BASE_API_URL;

// // export const useIsAuth = () => {
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const checkAuth = async () => {
// //       try {
// //         const res = await axios.get(`${base_url}/api/auth/protectedpage`, {
// //           withCredentials: true,
// //         });

// //         // If the response is OK, do nothing (stay on the current page)
// //         if (res.status !== 200) {
// //           navigate("/");
// //         }
// //       } catch (err) {
// //         // If error is 401 Unauthorized or anything else, redirect to login
// //         if (err.response && err.response.status === 401) {
// //           navigate("/");
// //         } else {
// //           console.error("Auth check failed:", err);
// //           navigate("/");
// //         }
// //       }
// //     };

// //     checkAuth();
// //   }, [navigate]);
// // };



// // // import { useEffect } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import axios from "axios";

// // // const base_url = import.meta.env.VITE_BASE_API_URL;

// // // export const useIsAuth = () => {
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     const checkAuth = async () => {
// // //       try {
// // //         const res = await axios.get(`${base_url}/auth/protectedPage`, {
// // //           withCredentials: true,
// // //         });

// // //         if (res.status !== 200) navigate("/");
// // //       } catch (err) {
// // //         if (err.response?.status === 401) navigate("/");
// // //         else {
// // //           console.error("Auth check failed:", err);
// // //           navigate("/");
// // //         }
// // //       }
// // //     };

// // //     checkAuth();
// // //   }, [navigate]);
// // // };

// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const base_url = import.meta.env.VITE_BASE_API_URL;

// export const useIsAuth = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const res = await axios.get(`${base_url}/api/auth/protectedpage`, {
//           withCredentials: true,
//         });

//         if (res.status !== 200) {
//           // If response is not 200, redirect to login
//           navigate("/");
//         }
//       } catch (err) {
//         if (err.response?.status === 401) {
//           // If Unauthorized, redirect to login
//           navigate("/");
//         } else {
//           console.error("Auth check failed:", err);
//           navigate("/");
//         }
//       }
//     };

//     checkAuth();
//   }, [navigate]);
// };


import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const base_url = import.meta.env.VITE_BASE_API_URL;

export const useIsAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${base_url}/api/auth/protectedPage`, {
          withCredentials: true,
        });
        if (res.status !== 200) {
          navigate("/login");
        }
      } catch (err) {
        console.error("Not authenticated", err);
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);
};

