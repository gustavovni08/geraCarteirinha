import React, { createContext, useContext, useState} from 'react'

const context = createContext()

export const useRefContext = () => useContext(context)

export const Provider = ({children}) => {
    const [reflist, setReflist] = useState({})

    return (
        <context.Provider value={{reflist, setReflist}}>
            {children}
        </context.Provider>
    )
}