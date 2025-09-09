// app/context/ModalContext.js
"use client";
import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState(null);


  
  const openModal = (item) => setSelectedItem(item);

  const closeModal = () => setSelectedItem(null);

  return (
    <ModalContext.Provider value={{ selectedItem, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
