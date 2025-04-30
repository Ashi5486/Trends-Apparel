import React from "react";
import { useIsAuth } from "../../hooks/useAuth";
import StyleList from "../../components/Style/StyleList";

const Styles = () => {
  useIsAuth();

  return (
    <div className="flex p-3 shadow-lg bg-white rounded-xl overflow-x-hidden">
      <main className="flex-1 overflow-auto mb-20">
        <StyleList />
      </main>
    </div>
  );
};

export default Styles;
