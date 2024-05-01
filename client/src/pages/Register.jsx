import RegisterSvg from "../assets/svg/register.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"
import Oauth from "../components/Oauth";

function Register({registerErrorToast, registerToast}) {
  const [formData, setFormData] = useState({
    username: "",
    full_name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {value, name} = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(formData.password != formData.confirmPassword){
      setError("Password Not matched");
      return;
    }
    try {
      const res = await axios.post("http://localhost:3000/api/v1/users/register", formData, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      registerToast(res.data.message);
      navigate('/login');
    } catch (error) {
      registerErrorToast(error.response.data.message);
    }
  }
  return (
    <section className="relative pt-15 overflow-hidden bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="max-w-7xl mx-auto">
          <div className="lg:flex lg:items-center">
            <div className="lg:w-3/5 px-4 order-last hidden lg:block">
              <div className="relative lg:mx-0 lg:max-w-3xl h-full">
                <img
                  className="block h-166 lg:h-full object-cover"
                  src={RegisterSvg}
                  alt=""
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2 xl:w-2/5 px-4 mb-14 lg:mb-0">
              <div className="max-w-md py-10 mx-auto lg:mr-0">
                <h3 className="font-heading text-4xl text-white font-semibold mb-4">
                  Create an Account
                </h3>
                <p className="text-lg text-gray-400 mb-8">
                  Welcome, Join our Community
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label
                      className="block mb-1.5 text-sm text-white font-semibold"
                      htmlFor=""
                    >
                      Username
                    </label>
                    <input
                      className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
                      type="text"
                      placeholder="patC22"
                      required
                      name="username"
                      onChange={handleChange}
                      value={formData.username}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      className="block mb-1.5 text-sm text-white font-semibold"
                      htmlFor=""
                    >
                      Full Name
                    </label>
                    <input
                      className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
                      type="text"
                      placeholder="pat cummins"
                      required
                      name="full_name"
                      onChange={handleChange}
                      value={formData.full_name}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      className="block mb-1.5 text-sm text-white font-semibold"
                      htmlFor=""
                    >
                      Email
                    </label>
                    <input
                      className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
                      type="email"
                      placeholder="pat@saturn.dev"
                      required
                      name="email"
                      onChange={handleChange}
                      value={formData.email}
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
                    </div>
                    <div className="relative">
                      <input
                        className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
                        type="password"
                        placeholder="Enter your password"
                        required
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                      />
                    </div>
                  </div>
                  <div className="mb-7">
                    <div className="flex mb-1.5 items-center justify-between">
                      <label
                        className="block text-sm text-white font-semibold"
                        htmlFor=""
                      >
                        Confirm Password
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
                        type="password"
                        placeholder="Confirm password"
                        required
                        name="confirmPassword"
                        onChange={handleChange}
                        value={formData.confirmPassword}
                      />
                    </div>
                  </div>
                  <button
                    className="relative group block w-full mb-6 py-3 px-5 text-center text-sm font-semibold text-orange-50 bg-orange-900 rounded-full overflow-hidden"
                    type="submit"
                  >
                    <div className="absolute top-0 right-full w-full h-full bg-orange-700 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
                    <span className="relative">Regsiter</span>
                  </button>
                  <div className="flex mb-6 items-center">
                    <div className="w-full h-px bg-gray-300"></div>
                    <span className="mx-4 text-sm font-semibold text-gray-500">
                      Or
                    </span>
                    <div className="w-full h-px bg-gray-300"></div>
                  </div>
                  <Oauth />
                  <span className="text-sm font-semibold text-white">
                    <span>Already have an account?</span>
                    <Link
                      className="ml-1 inline-block text-orange-800 hover:text-orange-700"
                      to={"/login"}
                    >
                      Sign In
                    </Link>
                  </span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register;
