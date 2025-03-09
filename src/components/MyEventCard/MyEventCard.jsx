import React from "react";
import { BiSolidCategory } from "react-icons/bi";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { MdAccessTimeFilled, MdOutlineSubtitles } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyEventCard = ({ event, myEvents, setMyEvents }) => {
  const { _id, title, description, date, time, location, category } = event;


  const handleDeleteEvent = (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`https://unity-hand-server.vercel.app/events/${id}`, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.deletedCount > 0) {
                const remainMyEvents = myEvents.filter(
                  (event) => event._id != id
                );
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });
                setMyEvents(remainMyEvents);
              }
            });
        }
      });
    };

  return (
    <div className="card card-dash bg-cyan-950 w-96 shadow-xl ">
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
        <div className="card-actions flex justify-between items-center py-3">
          <Link to={`/update-event/${_id}`} className="btn btn-warning">Edit</Link>
          <button onClick={()=>handleDeleteEvent(_id)} className="btn btn-error">Delete</button>
          <Link to={`/participants-event/${_id}`} className="btn btn-accent">Participants</Link>
        </div>
      </div>
    </div>
  );
};

export default MyEventCard;
