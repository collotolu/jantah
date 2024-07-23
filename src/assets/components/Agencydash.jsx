import React, { useState, useEffect } from "react";
import Profile from "../components/Profile";
import Clients from "../components/Clients";
import Loader from "./Loader";

function Agencydash() {
  const [agencyData, setAgencyData] = useState({});
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
    <div className="dashboard-container my-[4%] bg-[#E0F7FF] h-[100vh] ">
      <h1 className="dashboard-title font-bold text-[2em] text-center">Agency Dashboard</h1>
      <div className="dashboard-sections">
        <Profile agencyData={agencyData} setAgencyData={setAgencyData} />
        <Clients agencyId={agencyData.id} />
      </div>
    </div>
  );
}

export default Agencydash;
