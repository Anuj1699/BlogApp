import Register from "./pages/Register";
import Login from "./pages/Login";
import "./App.css"
import { Routes, Route } from "react-router-dom";
import { ToastContainer} from "react-toastify";
import { PublicRoute } from "./components/PublicRoute";
import { PrivateRoute } from "./components/PrivateRoute";
import Home from "./pages/Home";
import PostData from './pages/PostData';

function App() {
  return (
    <>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/postData/:id" element={<PostData />} />
          <Route element={<PrivateRoute />}></Route>

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
