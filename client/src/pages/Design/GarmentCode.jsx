import React from "react";
import GarmentCodeList from "../../components/GarmentCode/GarmentCodeList";

const GarmentCode = () => {

  return (
    <div className="flex p-2 shadow-lg bg-white rounded-xl overflow-x-hidden">
      <main className="flex-1 overflow-auto mb-20">
        <GarmentCodeList />
      </main>
    </div>
  );
};

export default GarmentCode;
