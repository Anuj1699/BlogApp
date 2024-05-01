import { useContext, createContext, useState, useEffect } from "react";

const UserContext = createContext();

export const parseJwt = (token) => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  const updateData = () => {
    const token = localStorage.getItem("auth-token");
    if(token){
      const userData = parseJwt(token);
      setUserInfo(userData);
    }
  }

  useEffect(() => {
    updateData();
  },[]);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, updateData }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  return context;
};

export { UserProvider, useUser};
