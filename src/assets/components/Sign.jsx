import { LuEye } from "react-icons/lu";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { data } from "autoprefixer";

function Sign() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [registerSelection, setRegisterSelection] = useState("");

  const [formData, setFormData] = useState({});
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  function handleRegisterSelection(selection) {
    setRegisterSelection(selection);
    setFormData((prev) => ({ ...prev, userType: selection }));
  }
  function changeThePassword() {
    setShowPassword((prev) => !prev);
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleRegistration() {
    const errors = {};
    if (!formData.fullName || formData.fullName === "") {
      errors.fullName = "Kindly fill all the Fields";
    }
    if (!formData.email || formData.email === "") {
      errors.email = "Kindly fill all the Fields";
    }
    if (!formData.phoneNumber || formData.phoneNumber === "") {
      errors.phoneNumber = "Kindly fill all the Fields";
    }
    if (!formData.password || formData.password === "") {
      errors.password = "Kindly fill all the Fields";
    }
    if (!formData.confirmPassword || formData.confirmPassword === "") {
      errors.confirmPassword = "Kindly fill all the Fields";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.fullName = "The password doesn't match";
    }
    if (formData.userType === "") {
      errors.userType = "Kindly select eighther as a client or an Agency";
    }
    // if (formData.password.length < 6) {
    //   errors.password = "The password doesn't match";
    // }
    setError(errors);

    if (Object.keys(errors).length === 0) {
      const { confirmPassword, ...otherData } = formData;
      setIsLoading(true);
      const url = "https://jantah-backend.onrender.com/api/auth/Register";
      const options = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(otherData),
      };
      const response = await fetch(url, options);
      const data = await response.json().catch(error);
      console.log(data);

      if (response.ok) {
        navigate("/login");
      } else {
        // setErrorMessage(data.message);
        setIsLoading(false);
      }
    }
  }

  return (
    <>
      {" "}
      {/* <div className="w-[50vw] h-[100%] bg-[#0D47A1] absolute -z-10 right-0"></div> */}
      <div className=" flex justify-center items-center shadow-[0_0_5px_lightgray] z-10 bg-[#E0F7FF] my-[2em]">
        <div className=" flex flex-col gap-5">
          {isLoading && <Loader />}
          <h1 className="flex justify-center text-5xl pr-[3em]  pt-3">
            Create Account
          </h1>
          <div className="flex bg-white box-boder shadow-[0_0_5px_lightgray] p-[50px] rounded-xl mb-[6em]">
            {errorMessage && errorMessage}
            <div className="">
              <img src="src/assets/images/sign.svg" className="w-[90%]" />
            </div>
            <div className="flex flex-col gap-5 ">
              <p className="text-red-500 font-bold">
                {error.fullName && error.fullName}
              </p>
              <div className="border-2  rounded-lg w-full shadow-lg">
                <input
                  type="text"
                  placeholder="Full Name"
                  className=" py-5 pr-[20em] px-2 bg-transparent outline-none flex-1 "
                  name="fullName"
                  onChange={handleChange}
                />
              </div>
              <p className="text-red-500 font-bold">
                {error.email && error.email}
              </p>
              <div className="border-2  rounded-lg w-full shadow-lg">
                <input
                  type="text"
                  placeholder="Email"
                  className=" py-5 pr-[20em] px-2 bg-transparent outline-none flex-1 "
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <p className="text-red-500 font-bold">
                {error.phoneNumber && error.phoneNumber}
              </p>
              <div className="border-2  rounded-lg w-full shadow-lg">
                <input
                  type="number"
                  placeholder="Phone Number"
                  className=" py-5 pr-[20em] px-2 bg-transparent outline-none flex-1 "
                  name="phoneNumber"
                  onChange={handleChange}
                />
              </div>
              <p className="text-red-500 font-bold">
                {error.password && error.password}
              </p>
              <div className="border-2  rounded-lg  shadow-lg flex">
                <input
                  type={showPassword ? "password" : "text"}
                  placeholder="password"
                  className=" py-5 pr-[20em] px-2 bg-transparent outline-none flex-1 "
                  name="password"
                  onChange={handleChange}
                />
                <div
                  className="flex  items-center text-[20px] cursor-pointer pr-4"
                  onClick={changeThePassword}
                >
                  {" "}
                  {showPassword ? <LuEye /> : <FaRegEyeSlash />}
                </div>
              </div>
              <p className="text-red-500 font-bold">
                {error.confirmPassword && error.confirmPassword}
              </p>
              <div className="border-2  rounded-lg w-full shadow-lg">
                <input
                  type={showPassword ? "password" : "text"}
                  placeholder="Confirm Passsword"
                  className=" py-5 pr-[20em] px-2 bg-transparent outline-none flex-1 "
                  name="confirmPassword"
                  onChange={handleChange}
                />
              </div>
              <label>Register as:</label>
              <div className="flex w-full gap-7">
                <div className="flex-1">
                  <button
                    className="bg-[#FE9C0A] flex gap-4 justify-center items-center py-[1em] px-[3em] cursor-pointer"
                    onClick={() => handleRegisterSelection("agency")}
                    style={{
                      backgroundColor:
                        registerSelection === "agency" ? "black" : "#FE9C0A",
                    }}
                  >
                    <div className="w-[30px] h-[30px] bg-white rounded-full"></div>
                    <span className="text-white font-bold">Agency</span>
                  </button>
                </div>
                <div className="flex-1">
                  <button
                    className="bg-[#FE9C0A] flex gap-4 justify-center items-center py-[1em] px-[3em]  cursor-pointer"
                    onClick={() => handleRegisterSelection("client")}
                    style={{
                      backgroundColor:
                        registerSelection === "client" ? "black" : "#FE9C0A",
                    }}
                  >
                    <div className="w-[30px] h-[30px] bg-white rounded-full"></div>
                    <span className="text-white font-bold">Client</span>
                  </button>
                </div>
              </div>

              <div className="flex justify-center ">
                <button
                  onClick={handleRegistration}
                  className="bg-[#FE9C0A] px-[5em] py-5 rounded-[2em] shadow-lg text-white font-bold "
                >
                  Create Account
                </button>
              </div>
              <div className="flex justify-center text-[25px]">
                Already Have An Account?
                <a href="/login" className="text-[#FE9C0A] ">
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sign;
