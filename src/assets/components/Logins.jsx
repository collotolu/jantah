import { FaRegEyeSlash } from "react-icons/fa";
import { useState, useContext } from "react";
import { useEffect } from "react";
import { LuEye } from "react-icons/lu";

import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { stringify } from "postcss";

function Logins() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  useEffect(() => {});
  function changeThePassword() {
    setShowPassword((prev) => !prev);
  }
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({});

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleRegistration() {
    const errors = {};
    if (!formData.email || formData.email === "") {
      errors.email = "The password doesn't match";
    }
    if (!formData.password || formData.password === "") {
      errors.password = "The password doesn't match";
    }
    if (formData.password.length < 6) {
      errors.password = "The password doesn't match";
    }
    setError(errors);
    if (!{} === false) {
      setIsLoading(true);
      const url = "https://jantah-backend.onrender.com/api/auth/LogIn";
      const options = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      };
      const response = await fetch(url, options);
      const data = await response.json().catch(error);
      console.log(data);

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        if (data.userType === "client") {
          navigate("/dashboard");
        }
        if (data.userType === "agency") {
          navigate("/form");
        } else {
          // setError(data.message);
          setIsLoading(false);
          window.location.reload();
        }
      }
    }
  }
  return (
    <div>
      <>
        <div className="bg-[#E0F7FF] h-[100vh] flex justify-center items-center my-[2em]">
          {isLoading && <Loader />}
          <div className="bg-white p-[3em] shadow-xl box-border rounded-xl flex flex-col gap-[2em]">
            <div className="flex justify-center text-center text-5xl text-[#FE9C0A]">
              Log In
            </div>
            <p className="text-red-500 font-bold">
              {error.email && error.email}
            </p>
            <div
              className="border-2  rounded-lg w-full shadow-lg "
              onChange={handleChange}
            >
              <input
                type="text"
                placeholder="Email"
                className=" py-5 pr-[20em] px-2 bg-transparent outline-none flex-1 "
                name="email"
              />
            </div>
            <p className="text-red-500 font-bold">
              {error.password && error.password}
            </p>
            <div
              className="border-2  rounded-lg  shadow-lg flex"
              onChange={handleChange}
            >
              <input
                type={showPassword ? "password" : "text"}
                placeholder="password"
                className=" py-5 pr-[20em] px-2 bg-transparent outline-none flex-1 "
                name="password"
              />
              <div
                className="flex  items-center text-[20px] cursor-pointer pr-4"
                onClick={changeThePassword}
              >
                {showPassword ? <LuEye /> : <FaRegEyeSlash />}
              </div>
            </div>
            <p className="text-red-400">{errorMessage}</p>

            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <input type="checkbox" className="w-4 h-4 mr-2" />
                <p>Remember me</p>
              </div>
              <p className="text-[#FE9C0A] underline underline-offset-2 cursor-pointer">
                Forgot Password?
              </p>
            </div>
            <div className="flex justify-center " onClick={handleRegistration}>
              <a
                href="#"
                className="bg-[#FE9C0A] px-[7em] py-5 rounded-2xl shadow-lg text-white font-bold"
              >
                Log in
              </a>
            </div>
            <div className="flex justify-center  text-[20px] my-2">
              Dont Have An Account Yet?
              <a href="/signup" className="text-[#FE9C0A]">
                Sign Up Free
              </a>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default Logins;
