import React, { useState, useEffect } from "react";
import Loader from "./Loader";

const FormComponent = () => {
  const [update, setUpdate] = useState({});
  const [error, setError] = useState({});
  const [succesfulMessage, setsuccesfulMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    agencyDetails: "",
    email: "",
    phoneNumber: "",
    image: null,
  });

  useEffect(() => {
    const agencyData = JSON.parse(localStorage.getItem("user"));

    if (agencyData) {
      setUpdate(agencyData);
    }
  }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "image") {
      const files = e.target.files;
      const reader = new FileReader();
      reader.onloadend = function () {
        const dataURL = reader.result;
        setFormData((prev) => ({
          ...prev,
          image: dataURL,
        }));
      };
      reader.readAsDataURL(files[0]);
    }
  }

  async function handleSubmit() {
    const errors = {};
    if (!formData.name || formData.name === "") {
      errors.name = "please enter your name";
    }
    if (!formData.agencyDetails || formData.agencyDetails === "") {
      errors.agencyDetails = "please enter the Agency Details";
    }
    if (!formData.email || formData.email === "") {
      errors.email = "please enter your email addres";
    }
    if (!formData.phoneNumber || formData.phoneNumber === "") {
      errors.phoneNumber = "please enter your phone";
    }
    if (!formData.businessOffered || formData.businessOffered === "") {
      errors.businessOffered = "please enter  the business offered";
    }
    if (!formData.location || formData.location === "") {
      errors.location = "please enter your Location";
    }
    if (!formData.image || formData.image === "") {
      errors.image = "Upload an Image";
    }
    setError(errors);
    if (!{} === false) {
      setIsLoading(true);
      const url = "https://jantah-backend.onrender.com/api/agency/add";
      const options = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      };
      const response = await fetch(url, options);
      const data = await response.json().catch(error);
      console.log(data);

      if (response.ok) {
        setsuccesfulMessage("added Succesfully");
        setIsLoading(false);
        window.location.reload();

        // setFormData();
      }
    }
  }

  return (
    <div className="flex items-center justify-center my-[2em] bg-[#E0F7FF] h-[150vh]">
      {isLoading && <Loader />}
      <div className="bg-white shadow-md rounded p-[7em] w-[40%] ">
        <div>
          <div className="mb-4 w-[100%] ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <p
              className="shadow appearance-none border rounded w-[100%] py-4 px-3 text-gray-700 "
              onChange={handleChange}
              name="name"
            >
              {update.fullName}
            </p>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>

            <p
              className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
              name="email"
            >
              {update.email}
            </p>
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>

            <p
              className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
              name="phoneNumber"
            >
              {update.phoneNumber}
            </p>
          </div>
          <div className="mb-4 w-[100%] ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Business Offered
            </label>
            <p className="text-red-500 font-bold">
              {error.businessOffered && error.businessOffered}
            </p>

            <input
              className="shadow appearance-none border rounded w-[100%] py-4 px-3 text-gray-700 "
              type="text"
              placeholder="Plumbers,Cleaners....etc"
              name="businessOffered"
              onChange={handleChange}
            />
          </div>


          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phoneNumber"
            >
              Location{" "}
            </label>
            <p className="text-red-500 font-bold">
              {error.location && error.location}
            </p>

            <input
              className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="tel"
              placeholder="Enter Agencies Location"
              name="location"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="agencyDetails"
            >
              Agency Details
            </label>
            <p className="text-red-500 font-bold">
              {error.agencyDetails && error.agencyDetails}
            </p>

            <textarea
              className="shadow appearance-none border rounded w-full py-6 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
              placeholder="Enter Agency Details"
              name="agencyDetails"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Upload Image
            </label>
            <p className="text-red-500 font-bold">
              {error.image && error.image}
            </p>

            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={(e) => handleChange(e)}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {formData.image && (
            <div className="mb-4">
              <img src={formData.image} alt="Uploaded" className="w-[40%]" />
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              className="bg-[#FE9C0A]  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={handleSubmit}
            >
              Submit{" "}
            </button>
          </div>
          <p className="text-green-500 text-[2em] font-bold">
            {" "}
            {succesfulMessage && succesfulMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
