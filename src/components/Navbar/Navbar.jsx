import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { ContextProvider } from "../../Provider/Provider";

const Navbar = () => {
  const { userAcount, signOutUser, notifySuccess, notifyError } =
    useContext(ContextProvider);

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>

      <li>
        <NavLink to={"/my-event"}>My Events</NavLink>
      </li>

      <li>
        <NavLink to={"/post-event"}>Post Event</NavLink>
      </li>

      <li>
        <NavLink to={"/applied-events"}>Applied Events</NavLink>
      </li>
    </>
  );

  const handleSignout = () => {
    signOutUser()
      .then(() => {
        notifySuccess("Sign-Out Successfully");
      })
      .catch((error) => {
        notifyError(error.message);
      });
  };

  return (
    <div className="navbar bg-base-100 shadow-sm w-11/12 mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          <img src="/logo1.png" alt="" />
          UnityHands
        </a>
        <h2>{userAcount?.displayName || ""}</h2>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {userAcount ? (
          <button onClick={handleSignout} className="btn btn-warning mr-2">
            Sign-Out
          </button>
        ) : (
          <div>
            <Link to={"/sign-in"} className="btn btn-success mr-2">
              Sign-in
            </Link>
            <Link to={"/sign-up"} className="btn btn-info mr-2">
              Sign-Up
            </Link>
          </div>
        )}

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {userAcount?.photoURL ? (
                <img
                  alt="Tailwind CSS Navbar component"
                  src={`${userAcount.photoURL}`}
                />
              ) : (
                <img
                  src="https://i.ibb.co.com/svySF97g/user.png"
                  alt="User"
                  className="rounded-xl"
                />
              )}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to={"/user-profile"} className="justify-between">
                Profile
              </Link>
            </li>

            {userAcount ? (
              <li onClick={handleSignout}>
                <a>Logout</a>{" "}
              </li>
            ) : (
              <li>
                <Link to={"/sign-in"}>Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
