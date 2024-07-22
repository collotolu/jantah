import React, { useState } from "react";

const Profile = ({ agencyData, setAgencyData }) => {
  const [formData, setFormData] = useState({ ...agencyData });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update the agency data in your database here
    setAgencyData(formData);
    setIsEditing(false);
  };

  return (
    <div className="profile-section">
      <h2>Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
          <textarea
            name="agencyDetails"
            value={formData.agencyDetails}
            onChange={handleChange}
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <div>
          <p>Name: {agencyData.name}</p>
          <p>Email: {agencyData.email}</p>
          <p>Phone: {agencyData.phoneNumber}</p>
          <p>Location: {agencyData.location}</p>
          <p>Details: {agencyData.agencyDetails}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
