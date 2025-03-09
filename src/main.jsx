import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login/Login.jsx";
import Registration from "./components/Registration/Registration.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Provider from "./Provider/Provider.jsx";
import AppliedEvents from "./components/AppliedEvents/AppliedEvents.jsx";
import PostEvent from "./components/PostEvent/PostEvent.jsx";
import MyEvents from "./components/MyEvents/MyEvents.jsx";
import UpdateMyEvent from "./components/UpdateMyEvent/UpdateMyEvent.jsx";
import ParticipantsEvent from "./components/ParticipantsEvent/ParticipantsEvent.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        loader: () => fetch("https://unity-hand-server.vercel.app/events"),
        element: <Home></Home>,
      },
      {
        path: "/sign-in",
        element: <Login></Login>,
      },
      {
        path: "/sign-up",
        element: <Registration></Registration>,
      },
      {
        path: "/user-profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "/applied-events",
        element: (
          <PrivateRoute>
            <AppliedEvents></AppliedEvents>
          </PrivateRoute>
        ),
      },
      {
        path: "/post-event",
        element: (
          <PrivateRoute>
            <PostEvent></PostEvent>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-event",
        element: (
          <PrivateRoute>
            <MyEvents></MyEvents>
          </PrivateRoute>
        ),
      },
      {
        path: "/update-event/:id",
        loader: ({ params }) =>
          fetch(`https://unity-hand-server.vercel.app/events/${params.id}`),
        element: (
          <PrivateRoute>
            <UpdateMyEvent></UpdateMyEvent>
          </PrivateRoute>
        ),
      },
      {
        path: "/participants-event/:id",
        loader: ({ params }) =>
          fetch(`https://unity-hand-server.vercel.app/application/${params.id}`),
        element: (
          <PrivateRoute>
            <ParticipantsEvent></ParticipantsEvent>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);

