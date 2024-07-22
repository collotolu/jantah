import React, { useState, useEffect } from "react";

const Clients = ({ agencyId }) => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      // Fetch clients from your database using the agencyId
      const response = await fetch(`/api/clients?agencyId=${agencyId}`);
      const data = await response.json();
      setClients(data);
    };

    fetchClients();
  }, [agencyId]);

  return (
    <div className="clients-section">
      <h2>Clients</h2>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>{client.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Clients;
