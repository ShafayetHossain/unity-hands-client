import React, { useContext } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { MdAccessTimeFilled, MdOutlineSubtitles } from "react-icons/md";
import { ContextProvider } from "../../Provider/Provider";
import Swal from "sweetalert2";
const EventsCard = ({ event }) => {
  const { _id, title, description, date, time, location, category, hr_email } =
    event;
  const { userAcount } = useContext(ContextProvider);

  const handleApplication = (id) => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];

    const applicationData = {
      job_id: id,
      applicant_email: userAcount?.email,
      date: formattedDate,
    };

    if (!userAcount) {
      Swal.fire({
        title: "please Login first!",
        text: "You clicked the button!",
        icon: "warning",
      });
    } else {
      fetch("https://unity-hand-server.vercel.app/application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((errorData) => {
              throw new Error(errorData.message); // Extract error message from the server
            });
          }
          return res.json();
        })
        .then((result) => {
          if (result.acknowledged) {
            Swal.fire({
              title: "Application Successful!",
              text: "Your application has been submitted.",
              icon: "success",
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            title: "Error!",
            text: error.message, // Display the error message from the server
            icon: "error",
          });
        });
    }
  };

  return (
    <div className="card card-dash bg-cyan-950 w-96 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <MdOutlineSubtitles />
          {title}
        </h2>

        <div className="flex items-center gap-x-2">
          <FaLocationDot />
          <p> {location}</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center gap-x-2">
            <MdAccessTimeFilled />
            <p>{time}</p>
          </div>

          <div className="flex justify-between items-center gap-x-2">
            <BsCalendar2DateFill />
            <p>{date}</p>
          </div>
        </div>

        <div className="flex justify-between items-center gap-x-2">
          <BiSolidCategory />
          <p>{category}</p>
        </div>
        <p>{description}</p>
        <div className="card-actions justify-end">
          {userAcount?.email != hr_email ? (
            <button
              onClick={() => handleApplication(_id)}
              className="btn btn-primary"
              disabled={!userAcount}
            >
              Join Event
            </button>
          ) : (
            <button className="btn btn-accent font-bold">Your Event</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsCard;
