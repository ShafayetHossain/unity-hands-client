import React from "react";
import Swal from "sweetalert2";

const AppliedEventCard = ({
  event,
  index,
  application,
  setApplication,
}) => {


  const handleRemoveEvent = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://unity-hand-server.vercel.app/application/${id}`, {
          method: "DELETE",
          credentials: "include",
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.deletedCount > 0) {
              const remainAppliedEvents = application.filter(
                (event) => event._id != id
              );
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              setApplication(remainAppliedEvents);
            }
          });
      }
    });
  };

  return (
    <tr>
      <th>{index + 1}</th>
      <td>{event?.title}</td>
      <td>{event?.description}</td>
      <td>{event?.date}</td>
      <td>{event?.time}</td>
      <td>{event?.location}</td>
      <td>{event?.category}</td>
      <td>{event?.hr_name}</td>
      <td>{event?.hr_email}</td>
      <td>
        <button
          onClick={() => handleRemoveEvent(event?._id)}
          className="btn btn-error"
        >
          Remove Event
        </button>
      </td>
    </tr>
  );
};

export default AppliedEventCard;
