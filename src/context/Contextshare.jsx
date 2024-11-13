import React, { createContext, useState } from 'react'

export const addResponseContext = createContext({})
export const editResponseContext = createContext({})
export const loginResponseContext = createContext({})

function Contextshare({children}) {
    const [addResponse, setaddResponse] = useState([])
    const [editresponse,seteditresponse] = useState([])
    const [loginresponse,setloginresponse] = useState(true)

  return (
    <>

   <addResponseContext.Provider value={{addResponse, setaddResponse}}>
     <editResponseContext.Provider value={{editresponse,seteditresponse}}>
      <loginResponseContext.Provider value={{loginresponse,setloginresponse}}>
        {children}
        </loginResponseContext.Provider>
      </editResponseContext.Provider>
     </addResponseContext.Provider>
    
    </>
  )
}

export default Contextshare
