// const Footer = ({ sidebarOpen }) => {
//   return (
//     <footer
//       className={`bg-gray-100 py-4 text-md text-gray-500 fixed bottom-1 w-[calc(100%-2rem)] ${
//         sidebarOpen ? "ml-0" : "ml-64" 

//       }`}
//     >
//       <div className="text-left px-8 md:px-12 lg:px-16 xl:px-20">
//         © 2025 All Rights Reserved by{" "}
//         <span className="font-semibold text-gray-800">Trends Apparel</span>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-4 text-md text-gray-500 border-t">
      <div className="text-left px-8">
        © 2025 All Rights Reserved by{" "}
        <span className="font-semibold text-gray-800">Trends Apparel</span>
      </div>
    </footer>
  );
};

export default Footer;
