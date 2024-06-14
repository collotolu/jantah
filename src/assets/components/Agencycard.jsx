import { IoLocation } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

function AgencyCard({
  image,
  name,
  agencyDetails,
  email,
  phoneNumber,
  businessOffered,
  location,
  agencyEmail,
}) {
  const [notification, setNotification] = useState("");

  const sendEmail = (clientEmail, agencyEmail) => {
    const templateParams = {
      clientEmail: clientEmail,
      agencyEmail: agencyEmail,
      message: notification,
    };
    emailjs
      .send(
        "service_jy657if",
        "template_z684glt",
        templateParams,
        "9Y_JIEpLe04pmagIp"
      )
      .then(
        (response) => {
          console.log("Email sent successfully:", response);
          setNotification("Email sent successfully!");
        },
        (error) => {
          console.error("Error sending email:", error);
          setNotification("Failed to send email. Please try again later.");
        }
      );
  };

  const navigate = useNavigate();
  function handlNavigate() {
    if (agencyEmail) {
      sendEmail("otienomito99@gmail.com", agencyEmail);
    }

    navigate("/payment");
  }
  return (
    <div className="bg-white rounded-md shadow-md p-6 border w-full mx-auto mb-8">
      <div>
        <div className="flex items-center gap-4">
          <img
            src={image}
            alt={name}
            className="w-20 h-20 rounded-full border"
          />
          <div>
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-gray-600">{agencyDetails}</p>
            {/* <p>{agencyEmail}</p> */}
          </div>
        </div>
        <div>
          <div className="mb-4">
            <p className="text-gray-600 mb-2">
              <span className="font-bold">Email:</span> {email}
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Phone:</span> {phoneNumber}
            </p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Business Offered:</h3>
            <p className="text-gray-600">{businessOffered}</p>
          </div>
          <div className="mb-4 flex items-center text-gray-600">
            <IoLocation className="text-[#FE9C0A] mr-2" />
            {location}
          </div>
          <button
            className="bg-[#FE9C0A] text-white px-4 py-2 rounded-md shadow-md transition duration-300 hover:bg-yellow-600"
            onClick={handlNavigate}
          >
            Book Now
          </button>
        </div>
      </div>
      {/* <p className="">{alert(notification)}</p> */}
    </div>
  );
}

export default AgencyCard;
