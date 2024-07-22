import React, { useState } from "react";

const UpdateWork = ({ agencyData, setAgencyData }) => {
  const [workDetails, setWorkDetails] = useState(agencyData.workDetails || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update the work details in your database here
    setAgencyData({ ...agencyData, workDetails });
  };

  return (
    <div className="update-work-section">
      <h2>Update Work</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          name="workDetails"
          value={workDetails}
          onChange={(e) => setWorkDetails(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateWork;
