import React, { useContext, useEffect, useState } from "react";
import { ContextProvider } from "../../Provider/Provider";
import AppliedEventCard from "../AppliedEventCard/AppliedEventCard";

const AppliedEvents = () => {
  const { userAcount } = useContext(ContextProvider);
  const [application, setApplication] = useState([]);

  useEffect(() => {
    if (userAcount) {
      fetch(`https://unity-hand-server.vercel.app/application?user=${userAcount?.email}`)
        .then((res) => res.json())
        .then((result) => {
          setApplication(result);
        });
    }
  }, [userAcount]);

  return (
    <div>
      <h1 className="text-center text-3xl py-3">Your Applied Events</h1>
      <div className="w-11/12 mx-auto rounded-box border border-base-content/5 bg-base-100 overflow-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Title</th>
              <th>Description</th>
              <th>Post date</th>
              <th>Time</th>
              <th>location</th>
              <th>category</th>
              <th>Host</th>
              <th>Host Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {application?.map((event, index) =>
              event?._id? (
                <AppliedEventCard
                  key={event?._id}
                  event={event}
                  index={index}
                  application={application}
                  setApplication={setApplication}
                ></AppliedEventCard>
              ) : null
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedEvents;
