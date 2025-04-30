// // src/components/ErrorBoundary.jsx
// import React, { Component } from 'react';

// class ErrorBoundary extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false, error: null, errorInfo: null };
//   }

//   static getDerivedStateFromError(error) {
//     // Update state so the next render will show the fallback UI
//     return { hasError: true, error };
//   }

//   componentDidCatch(error, errorInfo) {
//     // Log the error to an error reporting service or console
//     console.error('Error caught by ErrorBoundary:', error, errorInfo);
//     this.setState({ errorInfo });
//   }

//   render() {
//     if (this.state.hasError) {
//       // You can customize this fallback UI
//       return (
//         <div className="p-4 text-red-600 bg-red-100 rounded-lg">
//           <h2 className="text-lg font-semibold">Something went wrong.</h2>
//           <p>Details: {this.state.error?.message || 'No details available'}</p>
//           <button
//             onClick={() => this.setState({ hasError: false })}
//             className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             Try Again
//           </button>
//         </div>
//       );
//     }

//     return this.props.children;
//   }
// }

// export default ErrorBoundary;