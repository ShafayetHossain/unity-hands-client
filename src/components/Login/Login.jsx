import React, { useContext, useRef } from "react";
import lottielogin from "../../assets/lottiefiles/login.json";
import Lottie from "lottie-react";
import { Form, Link, useLocation, useNavigate } from "react-router-dom";
import { ContextProvider } from "../../Provider/Provider";
import axios from "axios";

const Login = () => {
  const {
    signInUser,
    signWithGoogle,
    resetPassword,
    notifySuccess,
    notifyWarning,
    notifyError,
  } = useContext(ContextProvider);
  const emailRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const handleSingin = (event) => {
    event.preventDefault();
    const form = event.target;

    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then(() => {
        notifySuccess("Sign-in successfully");
        navigate(location?.state ? location.state : "/");
        form.reset();
      })
      .catch((error) => {
        notifyError(error.message);
      });
  };

  const handleSocialSingin = () => {
    signWithGoogle()
      .then((res) => {
        const email = res?.user?.email;
       
        notifySuccess("Sign-in successfully");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        notifyError(error.message);
      });
  };

  const handleResetPassword = () => {
    const email = emailRef.current.value;

    if (email) {
      resetPassword(email)
        .then(() => {
          notifySuccess("A mail sent to your email");
        })
        .catch((error) => {
          notifyError(error.message);
        });
    } else {
      notifyWarning("Please input email first");
    }
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse w-11/12 mx-auto">
          <div className="text-center lg:text-left lg:w-1/2 ">
            <Lottie animationData={lottielogin} loop={true} />
          </div>

          <div className="card bg-base-100 max-w-sm shrink-0 shadow-2xl w-full lg:w-1/2">
            <div className="card-body">
              <h1 className="text-5xl font-bold text-center pb-2">
                Login now!
              </h1>{" "}
              <hr /> <br />
              <button
                onClick={handleSocialSingin}
                className="btn btn-soft btn-primary"
              >
                Login With Google
              </button>
              <div className="divider">OR</div>
              <form onSubmit={handleSingin} className="fieldset">
                <label className="fieldset-label">Email</label>
                <input
                  ref={emailRef}
                  name="email"
                  type="email"
                  className="input"
                  placeholder="Email"
                />
                <label className="fieldset-label">Password</label>
                <input
                  name="password"
                  type="password"
                  className="input"
                  placeholder="Password"
                />
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    className="link link-hover hover:text-red-500"
                  >
                    Forgot password?
                  </button>
                  <Link
                    to={"/sign-up"}
                    state={location?.state}
                    className="link link-hover hover:text-orange-500"
                  >
                    Don't have accout click here.!
                  </Link>
                </div>
                <button type="submit" className="btn btn-neutral mt-4">
                  Sign-In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
