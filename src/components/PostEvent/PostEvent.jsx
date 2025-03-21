import React, { useContext } from "react";
import { ContextProvider } from "../../Provider/Provider";
import ConvertTo12Hour from "../utility/ConvertTo12Hour";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const PostEvent = () => {
  const navigate = useNavigate();
  const { userAcount } = useContext(ContextProvider);

  const handleEventData = (event) => {
    event.preventDefault();
    const form = event.target;

    const title = form.title.value;
    const description = form.description.value;
    const date = form.date.value;
    const time = ConvertTo12Hour(form.time.value);
    const location = form.location.value;
    const category = form.category.value;
    const hr_name = userAcount.displayName;
    const hr_email = userAcount.email;
    const newEvent = {
      title,
      description,
      date,
      time,
      location,
      category,
      hr_name,
      hr_email,
    };

    fetch(`https://unity-hand-server.vercel.app/events`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged) {
          Swal.fire({
            title: "Good job!",
            text: "Event Added Successfully!",
            icon: "success",
          }).then(() => {
            form.reset();
            navigate("/my-event");
          });
        }
      });
  };

  return (
    <div className="bg-[#F4F3F0]">
      <div className="p-5 lg:w-10/12 mx-auto">
        <form onSubmit={handleEventData} action="" method="post" className="">
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
                  name="category"
                  className="select w-full bg-white text-black"
                >
                  <option disabled selected>
                    Select Category
                  </option>
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
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostEvent;
