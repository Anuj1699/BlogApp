import React, { createContext, useContext } from "react";
import {toast} from "react-toastify";

const ToastContext = createContext();

const ToastProvider = ({ children }) => {
    const showMessage = (data) => {
        toast(data, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      };
      
      const showErrorMessage = (data) => {
        toast.error(data, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      };
    return (
        <> 
          <ToastContext.Provider value={{showMessage, showErrorMessage}}>{children}</ToastContext.Provider>
        </>
    )
};

const useToast = () => {
    const context = useContext(ToastContext);
    return context;
}

export {ToastProvider, useToast};