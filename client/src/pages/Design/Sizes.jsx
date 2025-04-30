import React from "react";
import SizeList from "../../components/Sizes/SizeList";
// import ColorsList from "../../components/Colors/ColorsList";

const Sizes = () => {

  return (
    <div className="flex p-2 shadow-lg bg-white rounded-xl overflow-x-hidden">
      <main className="flex-1 overflow-auto mb-20">
        {/* <ColorsList /> */}
        <SizeList />
      </main>
    </div>
  );
};

export default Sizes;
