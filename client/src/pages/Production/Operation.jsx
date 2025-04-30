import React from 'react';
import OperationList from "../../components/operations/operationList";
// import { useIsAuth } from '@/hooks/useIsAuth';

const Operation = () => {
  // const isAuthenticated = useIsAuth();  // Assuming this hook returns a boolean or redirects if unauthenticate

  return (
    // <div className="flex p-3 shadow-lg mx-3 border border-gray-50 overflow-x-hidden">
    //   <main className="flex-1 overflow-auto bg-gray-50 ">
    <div className='flex p-4 shadow-lg  bg-white rounded-xl overflow-x-hidden'>
            <main className='flex-1  overflow-auto '>
        <OperationList />
      
      </main>
    </div>
  )
}

export default Operation
