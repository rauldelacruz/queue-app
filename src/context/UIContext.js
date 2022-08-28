import React, { createContext, useState } from 'react'

export const UIContext = createContext();

export const UIProvider = ({ children }) => {

  const [hide, setHide] = useState(true)

  const showMenu = () => {
    setHide(false)
  }

  const hideMenu = () => {
    setHide(true)
  }

  return (
    <UIContext.Provider value={{
      hide,
      hideMenu,
      showMenu
    }}>
      { children }
    </UIContext.Provider>
  )
}
