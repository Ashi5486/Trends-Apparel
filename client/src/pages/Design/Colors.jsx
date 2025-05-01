import React from "react";
import ColorsList from "../../components/Colors/ColorsList";

const colors = () => {

  return (
    <div className="flex p-4  shadow-lg bg-white rounded-xl overflow-x-hidden">
      <main className="flex-1 overflow-auto mb-20">
        <ColorsList />
      </main>
    </div>
  );
};

export default colors;
