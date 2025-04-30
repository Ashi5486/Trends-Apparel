import React from "react";
import SectionList from "../../components/Section/SectionList";
import { useIsAuth } from "../../hooks/useAuth";


const Section = () => {
  useIsAuth();

  return (
    <div className="flex p-4 shadow-lg bg-white rounded-xl overflow-x-hidden">
      <main className="flex-1 overflow-auto">
  
          <SectionList />
       
      
      </main>
    </div>
  );
};

export default Section;