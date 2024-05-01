import blogSvg from "../assets/svg/blog.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Oauth from "../components/Oauth";
import { useUser } from "../context/User";
import {useToast} from "../context/Toast"

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const user = useUser();
  const toast = useToast();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("auth-token", res.data.token);
      user.updateData();
      toast.showMessage(res.data.message);
      navigate("/");
    } catch (error) {
       toast.showErrorMessage(error.data.response.message);
    }
  };
return (
    <>
      <section className="relative pt-20 overflow-hidden bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="max-w-7xl mx-auto">
            <div className="lg:flex lg:items-center">
              <div className="lg:w-3/5 px-4 order-first hidden lg:block">
                <div className="relative lg:mx-0 lg:max-w-3xl h-full">
                  <img
                    className="block h-166 lg:h-full object-cover"
                    src={blogSvg}
                    alt=""
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2 xl:w-2/5 px-4 mb-16 lg:mb-0">
                <div className="max-w-md lg:py-20 mx-auto lg:mr-0">
                  <h3 className="font-heading text-4xl text-white font-semibold mb-4">
                    Sign in to your account
                  </h3>
                  <p className="text-lg text-gray-400 mb-10">
                    Greetings on your return! We kindly request you to enter
                    your details.
                  </p>
                  <Oauth />
                  <div className="flex mb-6 items-center">
                    <div className="w-full h-px bg-gray-300"></div>
                    <span className="mx-4 text-sm font-semibold text-gray-500">
                      Or
                    </span>
                    <div className="w-full h-px bg-gray-300"></div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <label
                        className="block mb-1.5 text-sm text-white font-semibold"
                        htmlFor=""
                      >
                        Email
                      </label>
                      <input
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
                        type="email"
                        placeholder="pat@saturn.dev"
                      />
                    </div>
                    <div className="mb-7">
                      <div className="flex mb-1.5 items-center justify-between">
                        <label
                          className="block text-sm text-white font-semibold"
                          htmlFor=""
                        >
                          Password
                        </label>
                        <a
                          className="inline-block text-sm font-semibold text-orange-800 hover:text-orange-600"
                          href="#"
                        >
                          Forget password?
                        </a>
                      </div>
                      <div className="relative">
                        <input
                          required
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
                          type="password"
                          placeholder="Enter your password"
                        />
                        <button className="absolute top-1/2 right-0 mr-3 transform -translate-y-1/2 inline-block hover:scale-110 transition duration-100">
                          <img
                            src="saturn-assets/images/sign-up/icon-eye.svg"
                            alt=""
                          />
                        </button>
                      </div>
                    </div>

                    <div className="flex mb-6 items-center">
                      <input type="checkbox" value="" id="" />
                      <label className="ml-2 text-sm text-white" htmlFor="">
                        Remember for 30 days
                      </label>
                    </div>
                    <button
                      className="relative group block w-full mb-6 py-3 px-5 text-center text-sm font-semibold text-orange-50 bg-orange-900 rounded-full overflow-hidden"
                      type="submit"
                    >
                      <div className="absolute top-0 right-full w-full h-full bg-orange-700 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
                      <span className="relative">Login</span>
                    </button>
                    <span className="text-sm font-semibold text-white">
                      <span>Don’t have an account?</span>
                      <Link
                        className="ml-1 inline-block text-orange-800 hover:text-orange-600"
                        to={"/register"}
                      >
                        Sign up
                      </Link>
                    </span>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login;
