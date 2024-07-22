
import React, { useState, useEffect } from "react";
import Profile from "../components/Profile";
import Clients from "../components/Clients";
import UpdateWork from "../components/UpdateWork";
import Loader from "./Loader";

const Agencydash = () => {
  const [agencyData, setAgencyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = JSON.parse(localStorage.getItem("user"));
      if (storedData) {
        setAgencyData(storedData);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="dashboard-container my-[10%]">
      <h1 className="dashboard-title">Agency Dashboard</h1>
      <div className="dashboard-sections">
        <Profile agencyData={agencyData} setAgencyData={setAgencyData} />
        <UpdateWork agencyData={agencyData} setAgencyData={setAgencyData} />
        <Clients agencyId={agencyData.id} />
      </div>
    </div>
  );
};

export default Agencydash;
