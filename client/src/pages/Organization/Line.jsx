import React from 'react';
import { useIsAuth } from '../../hooks/useAuth';
import LineList from '../../components/Line/LineList';

const Line = () => {
  useIsAuth(); // Ensure authentication is checked
  
  return (
    <div className="flex p-2 shadow-lg bg-white rounded-xl overflow-x-hidden">
      <main className="flex-1 overflow-auto mb-20">
        <LineList />
      </main>
    </div>
  );
}

export default Line;
