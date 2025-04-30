import React from "react"
import MachineList from "../../components/Machine/MachineList"
// import { useIsAuth } from "../../hooks/useAuth"
// const base_url = import.meta.env.VITE_BASE_API_URL?


const Machines = () => {
  // useIsAuth()
  return (
    // <div className="flex p-3 shadow-lg mx-3 border border-gray-50 overflow-x-hidden">
    //   <main className="flex-1 overflow-auto bg-gray-50 ">
    <div className='flex p-4 shadow-lg  bg-white rounded-xl overflow-x-hidden'>
            <main className='flex-1  overflow-auto '>
        <MachineList />
      
      </main>
    </div>
  )
}

export default Machines
