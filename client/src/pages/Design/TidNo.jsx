import React from 'react'
import { useIsAuth } from '../../hooks/useAuth'
import TidnoList from '../../components/Tidno/TidnoList'

const Tidno = () => {
//  
useIsAuth()
    return (
        <div className='flex p-2  shadow-lg bg-white rounded-xl overflow-x-hidden'>
          <main className='flex-1 overflow-auto mb-20'>
           
           <TidnoList/>

 
          </main>
          
        </div>

  )
}

export default Tidno