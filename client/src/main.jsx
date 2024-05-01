import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/User";
import { ToastProvider } from "./context/Toast.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <UserProvider>
    <ToastProvider>
      <App />
    </ToastProvider>  
    </UserProvider>
  </BrowserRouter>
);
