import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa";
import { CgDetailsMore } from "react-icons/cg";

const Profile = ({ agencyData, setAgencyData }) => {
  const [formData, setFormData] = useState({ ...agencyData });
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!{} === false) {
      const url =
        "https://jantah-backend.onrender.com/api/agency/6668613338d4ef47d9afdff9";
      const option = {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      };
      try {
        const response = await fetch(url, option);
        const data = await response.json();
        console.log(data);
        if (data.success) {
          // Assuming `data.success` indicates a successful update
          setSuccessMessage("Profile updated successfully!");
          setAgencyData(formData);
        } else {
          setSuccessMessage("Update failed. Please try again.");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        setSuccessMessage("Update failed. Please try again.");
      }
    }
    setIsEditing(false);
  }

  return (
    <div className="profile-section bg-white shadow-md rounded p-[7em] w-[40%] mx-auto my-[50px]">
      <h2 className="font-bold text-[30px]">Profile</h2>
      {successMessage && (
        <p className="text-green-600 font-bold">{successMessage}</p>
      )}
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex gap-4 flex-col">
          <input
            placeholder="Change your name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-[100%] py-4 px-3 text-gray-700"
          />
          <input
            placeholder="Change your email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-[100%] py-4 px-3 text-gray-700"
          />
          <input
            placeholder="Change your phone number"
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
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
            value={formData.agencyDetails}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-[100%] py-4 px-3 text-gray-700"
          />
          <button
            type="submit"
            className="bg-orange-600 px-[20px] py-[10px] rounded-2xl text-white font-bold"
          >
            Save
          </button>
        </form>
      ) : (
        <div className="leading-7">
          <div className="flex gap-4">
            <FaUser />
            <p>Name: {agencyData.name}</p>
          </div>
          <div className="flex gap-4">
            <MdEmail />
            <p>Email: {agencyData.email}</p>
          </div>
          <div className="flex gap-4">
            <FaPhoneAlt />
            <p>Phone: {agencyData.phoneNumber}</p>
          </div>
          <div className="flex gap-4">
            {/* <FaLocationDot /> */}
            <p>Location: {agencyData.location}</p>
          </div>
          <div className="flex gap-4">
            <CgDetailsMore />
            <p>Business Offered: {agencyData.businessOffered}</p>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-orange-600 px-[20px] py-[10px] rounded-2xl text-white font-bold"
            >
              Edit
            </button>
            <button
              onClick={() => {
                setIsEditing(true);
                handleSubmit(new Event("submit")); // Trigger form submit programmatically
              }}
              className="bg-orange-600 px-[20px] py-[10px] rounded-2xl text-white font-bold"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
