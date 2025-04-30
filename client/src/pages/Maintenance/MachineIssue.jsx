import React from "react"
import MachineIssueList from "../../components/MachineIssue/MachineIssueList"


const MachineIssue = () => {
  // useIsAuth()
  return (
    // <div className="flex p-3 shadow-lg mx-3 border border-gray-50 overflow-x-hidden">
    //   <main className="flex-1 overflow-auto bg-gray-50 ">
    <div className='flex p-4 shadow-lg  bg-white rounded-xl overflow-x-hidden'>
            <main className='flex-1  overflow-auto '>
        <MachineIssueList />
      
      </main>
    </div>
  )
}

export default MachineIssue
