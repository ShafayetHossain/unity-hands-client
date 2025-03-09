import { div } from "motion/react-client";
import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ConvertTo12Hour from "../utility/ConvertTo12Hour";
import ConvertTo24Hour from "../utility/ConvertTo24Hour ";

const UpdateMyEvent = () => {
  const updateLoaderData = useLoaderData();
  const navigate = useNavigate();
  const { _id, title, description, date, time, location, category } =
    updateLoaderData;
  const converted24hour = ConvertTo24Hour(time);

  const handleUpdateData = (event) => {
    event.preventDefault();
    const form = event.target;

    const title = form.title.value;
    const description = form.description.value;
    const date = form.date.value;
    const time = ConvertTo12Hour(form.time.value);
    const location = form.location.value;
    const category = form.category.value;
    const updateEvent = {
      title,
      description,
      date,
      time,
      location,
      category,
    };

    fetch(`https://unity-hand-server.vercel.app/events/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateEvent),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.modifiedCount > 0) {
          Swal.fire({
            title: "Good job!",
            text: "Event Update Successfully!",
            icon: "success",
          }).then(() => {
            navigate("/my-event");
          });
        } else {
          Swal.fire({
            title: "OOps!",
            text: "Input Field IS Not Modified Yet!",
            icon: "warning",
          });
        }
      });
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center py-4 divider">
        My Update Feature
      </h1>
      <div className="bg-[#F4F3F0]">
        <div className="p-5 w-10/12 mx-auto">
          <form
            onSubmit={handleUpdateData}
            action=""
            method="post"
            className=""
          >
            <div className="flex justify-center items-center py-4 gap-x-3">
              <div className="w-full flex flex-col justify-center items-center space-y-5">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text text-[#374151] font-semibold text-xl">
                      Event Title
                    </span>
                  </div>
                  <input
                    required
                    defaultValue={title}
                    type="text"
                    name="title"
                    placeholder="Enter Event Title"
                    className="input input-bordered w-full bg-white text-black"
                  />
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text text-[#374151] font-semibold text-xl">
                      Event Description
                    </span>
                  </div>
                  <input
                    required
                    defaultValue={description}
                    type="text"
                    name="description"
                    placeholder="Enter Event Description"
                    className="input input-bordered w-full bg-white text-black"
                  />
                </label>

                <label className="form-control w-full py-2">
                  <div className="label">
                    <span className="label-text text-[#374151] font-semibold text-xl">
                      Event Time
                    </span>
                  </div>
                  <input
                    required
                    defaultValue={converted24hour}
                    type="time"
                    name="time"
                    className="input input-bordered w-full bg-white text-black"
                  />
                </label>
              </div>

              <div className="w-full flex flex-col justify-center items-center space-y-5">
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text text-[#374151] font-semibold text-xl">
                      Event Date
                    </span>
                  </div>
                  <input
                    required
                    defaultValue={date}
                    type="date"
                    name="date"
                    className="input input-bordered w-full bg-white  text-black"
                  />
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text text-[#374151] font-semibold text-xl">
                      Event Category
                    </span>
                  </div>

                  <select
                    required
                    defaultValue={category}
                    name="category"
                    className="select w-full bg-white text-black"
                  >
                    <option disabled>Select Category</option>
                    <option>Environment </option>
                    <option>Social Welfare</option>
                    <option>Health & Wellness</option>
                    <option>Education </option>
                    <option>Animal Welfare</option>
                    <option>Arts & Culture</option>
                    <option>Advocacy & Human Rights</option>
                    <option>Emergency Response</option>
                  </select>
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text text-[#374151] font-semibold text-xl">
                      Event location
                    </span>
                  </div>
                  <input
                    required
                    defaultValue={location}
                    type="text"
                    name="location"
                    placeholder="Enter Event location"
                    className="input input-bordered w-full bg-white text-black"
                  />
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="rancho-font bg-[#D2B48C] text-[#331A15] px-4 py-2 text-2xl flex justify-center items-center w-full rounded-xl"
            >
              Update Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateMyEvent;
