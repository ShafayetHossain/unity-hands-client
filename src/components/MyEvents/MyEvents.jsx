import React, { useContext, useEffect, useState } from "react";
import { ContextProvider } from "../../Provider/Provider";
import MyEventCard from "../MyEventCard/MyEventCard";

const MyEvents = () => {
  const [myEvents, setMyEvents] = useState([]);
  const { userAcount } = useContext(ContextProvider);

  useEffect(() => {
    fetch(`https://unity-hand-server.vercel.app/events?user=${userAcount?.email}`)
      .then((res) => res.json())
      .then((result) => {
        setMyEvents(result);
      });
  }, [userAcount]);

  const handleSearch = (event) => {
    const search = event.target.value;

    fetch(
      `https://unity-hand-server.vercel.app/events?user=${userAcount?.email}&searchEvent=${search}`
    )
      .then((res) => res.json())
      .then((result) => {
        setMyEvents(result);
      });
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center py-4 divider">
        My Events Feature
      </h1>

      <div className="flex justify-center items-center">
        <label className="input flex">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            onChange={handleSearch}
            type="search"
            required
            placeholder="Search Event"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-5 w-11/12 mx-auto py-5">
        {myEvents.map((event) => (
          <MyEventCard
            key={event._id}
            event={event}
            myEvents={myEvents}
            setMyEvents={setMyEvents}
          ></MyEventCard>
        ))}
      </div>
    </div>
  );
};

export default MyEvents;
