import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ParticipantsEventCard = ({
  index,
  participant,
  participants,
  setParticipants,
}) => {
  const { _id, job_id, applicant_email, date } = participant;
  const [event, setEvent] = useState([]);

  useEffect(() => {
    fetch(`https://unity-hand-server.vercel.app/events/${job_id}`)
      .then((res) => res.json())
      .then((event) => {
        setEvent(event);
      });
  }, []);

  const { category, description, hr_name, location, time, title } = event;

  const subject = `Hello dear Participant This is about the event of ${title}`;
  const body = `
📅 Event Date & Time: ${time}
📍 Location: ${location}
📝 Category: ${category}
👤 Host Contact: ${applicant_email}

Event Description:
${description}

We are excited to have you on board! Please arrive in ${location} 15 minutes early, and feel free to reach out if you have any questions.

If you can no longer attend, kindly let us know in advance.

Looking forward to seeing you there!

Best Regards,
 ${hr_name}`;

  const handleRemoveParticipant = (id) => {
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
        fetch(`https://unity-hand-server.vercel.app/participant/${id}`, {
          method: "DELETE",
          credentials: "include",
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.deletedCount > 0) {
              const remainAppliedEvents = participants.filter(
                (volunteer) => volunteer._id != id
              );
              Swal.fire({
                title: "Removed!",
                text: "Your participant has been removed.",
                icon: "success",
              });
              setParticipants(remainAppliedEvents);
            }
          });
      }
    });
  };

  return (
    <tr className="text-center">
      <th>{index + 1}</th>
      <td className="text-red-500">{applicant_email}</td>
      <td>{title}</td>
      <td>{location}</td>
      <td>{time}</td>
      <td>{date}</td>
      <td className="flex flex-col items-center gap-y-2">
        <button
          onClick={() =>
            (window.location.href = `mailto:${applicant_email}?subject=${subject}&body=${body}`)
          }
          className="btn btn-warning"
        >
          Infrom Participant
        </button>
        <button
          onClick={() => handleRemoveParticipant(_id)}
          className="btn btn-error"
        >
          Remove Participant
        </button>
      </td>
      <tr>
      </tr>
    </tr>
  );
};

export default ParticipantsEventCard;
