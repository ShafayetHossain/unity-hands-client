import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ParticipantsEventCard from "../ParticipantsEventCard/ParticipantsEventCard";

const ParticipantsEvent = () => {
  const participantsEvent = useLoaderData();
  const [participants, setParticipants] = useState(participantsEvent);
  console.log(participants);

  return (
    <div>
      <h1 className="text-center text-3xl py-3">
        Total participants- {participants.length}
      </h1>
      <div className="overflow-auto w-9/12 mx-auto ">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th>Serial</th>
              <th>Volunteer Email</th>
              <th>Event Title</th>
              <th>Event Location</th>
              <th>time</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}

            {participants.map((participant, index) => (
              <ParticipantsEventCard
                key={participant._id}
                index={index}
                participant={participant}
                participants={participants}
                setParticipants={setParticipants}
              ></ParticipantsEventCard>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParticipantsEvent;
