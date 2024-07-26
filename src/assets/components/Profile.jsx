import React, { useState, useContext, useEffect } from "react";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import { FaLocationDot } from "react-icons/fa6";
import { StateContext } from "../../context/state";
import Loader from "../components/Loader";

const Profile = () => {
  const { agencyData, setAgencyData } = useContext(StateContext);
  const [formData, setFormData] = useState({ ...agencyData });
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { currentUser, setCurrentUser } = useContext(StateContext);

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    const url = `https://jantah-backend.onrender.com/api/agency/${_id}`;

    (async () => {
      const response = await fetch(url);
      const data = await response.json();
      setAgencyData(data);
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const url = `https://jantah-backend.onrender.com/api/agency/${currentUser._id}`;
    const option = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    try {
      const response = await fetch(url, option);
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Profile updated successfully!");
        setErrorMessage("");
        setAgencyData(data);
      } else {
        setSuccessMessage("");
        setErrorMessage("Update failed. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setSuccessMessage("");
      setErrorMessage("Update failed. Please try again.");
    } finally {
      setIsLoading(false);
      setIsEditing(false);
      setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      });
    }
  }

  return (
    <div className="profile-section bg-white shadow-md rounded p-[7em] w-[40%] mx-auto my-[50px]">
      {console.log(agencyData && agencyData)}
      {isLoading && <Loader />}
      <h2 className="font-bold text-[30px]">Profile</h2>
      {successMessage && (
        <p className="text-green-600 font-bold">{successMessage}</p>
      )}
      {errorMessage && <p className="text-red-600 font-bold">{errorMessage}</p>}
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex gap-4 flex-col">
          <input
            placeholder="Change your name"
            type="text"
            name="name"
            value={agencyData && agencyData.fullName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-[100%] py-4 px-3 text-gray-700"
          />
          <input
            placeholder="Change your email"
            type="email"
            name="email"
            value={agencyData && agencyData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-[100%] py-4 px-3 text-gray-700"
          />
          <input
            placeholder="Change your phone number"
            type="tel"
            name="phoneNumber"
            value={agencyData && agencyData.phoneNumber}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-[100%] py-4 px-3 text-gray-700"
          />
          <input
            placeholder="Change your location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-[100%] py-4 px-3 text-gray-700"
          />
          <input
            placeholder="Change the business offered"
            name="agencyDetails"
            value={formData.businessOffered}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-[100%] py-4 px-3 text-gray-700"
          />
          <button
            type="submit"
            className="bg-[#FE9C0A] px-[20px] py-[10px] rounded-2xl text-white font-bold"
            onClick={handleSubmit}
          >
            Save
          </button>
        </form>
      ) : (
        <div className="leading-9">
          <div className="flex gap-4">
            <FaUser />
            <p>Name: {agencyData && agencyData.fullName}</p>
          </div>
          <div className="flex gap-4">
            <MdEmail />
            <p>Email: {agencyData && agencyData.email}</p>
          </div>
          <div className="flex gap-4">
            <FaPhoneAlt />
            <p>Phone: {agencyData && agencyData.phoneNumber}</p>
          </div>
          <div className="flex gap-4">
            <FaLocationDot />
            <p>Location: {agencyData && agencyData.location}</p>
          </div>
          <div className="flex gap-4">
            <CgDetailsMore />
            <p>Business Offered: {agencyData && agencyData.businessOffered}</p>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-[#FE9C0A] px-[20px] py-[10px] rounded-2xl text-white font-bold"
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
