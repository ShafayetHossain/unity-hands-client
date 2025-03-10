import React, { useContext } from "react";
import lottieregistration from "../../assets/lottiefiles/registration.json";
import Lottie from "lottie-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ContextProvider } from "../../Provider/Provider";
const Registration = () => {
  const {
    setLoading,
    createUser,
    updateUser,
    notifySuccess,
    notifyError,
  } = useContext(ContextProvider);
  const navigate = useNavigate();
  const location = useLocation();
  const nameRegex = /^.{1,40}$/; // Name must be between 1 and 40 characters
  const photoUrlRegex = /\.(jpeg|jpg|png|gif|bmp|webp)$/i; // Checks if URL ends with an image extension
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/; // At least 1 lowercase, 1 uppercase, 1 digit, and 7+ characters

  const handleRegistration = (event) => {
    event.preventDefault();

    const form = event.target;
    const photoUrl = form.photo.value;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    if (!nameRegex.test(name)) {
      notifyError("Name must be between 1 and 40 characters.");
      return 0;
    }
    if (!photoUrlRegex.test(photoUrl)) {
      notifyError(
        "Invalid photo URL. It must end with a valid image extension."
      );
      return 0;
    }
    if (!passwordRegex.test(password)) {
      notifyError(
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and be at least 7 characters long."
      );
      return 0;
    } else {
      // createUser(email, password)
      //   .then(() => {
      //     updateUser(name, photoUrl)
      //       .then(() => {
      //         notifySuccess("User Create successfully");
      //         form.reset();
      //       })
      //       .catch((error) => {
      //         notifyError(error.message);
      //         return 0;
      //       });
      //   })
      //   .catch((error) => {
      //     notifyError(error.message);
      //     return 0;
      //   });
      createUser(email, password)
        .then(() => updateUser(name, photoUrl)) 
        .then(() => {
          notifySuccess("User Created Successfully");
          setLoading(true);
          setTimeout(() => {
            setLoading(false); 
            navigate(location?.state? location.state : "/"); 
          }, 1500);
        })
        .catch((error) => {
          notifyError(error.message);
        });
    }
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse w-11/12 mx-auto">
          <div className="text-center lg:text-left w-1/2 ">
            <Lottie animationData={lottieregistration} loop={true} />
          </div>

          <div className="card bg-base-100 max-w-sm shrink-0 shadow-2xl w-1/2">
            <div className="card-body">
              <h1 className="text-5xl font-bold text-center pb-2">
                Registration now!
              </h1>
              <fieldset className="fieldset">
                <form
                  onSubmit={handleRegistration}
                  method=""
                  className="fieldset"
                >
                  <label className="fieldset-label">Photo Url</label>
                  <input
                    name="photo"
                    type="text"
                    className="input"
                    placeholder="Input Your Photo Url"
                    required
                  />

                  <label className="fieldset-label">Name</label>
                  <input
                    name="name"
                    type="text"
                    className="input"
                    placeholder="Input Your Name"
                    required
                  />

                  <label className="fieldset-label">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="input"
                    placeholder="Input Your Email"
                    required
                  />

                  <label className="fieldset-label">Password</label>
                  <input
                    name="password"
                    type="password"
                    className="input"
                    placeholder="Input Your Password"
                    required
                  />
                  <Link
                    to={"/sign-in"}
                    className="link link-hover hover:text-green-500"
                  >
                    Already have an accout.
                  </Link>
                  <button type="submit" className="btn btn-neutral mt-4">
                    Sign-Up
                  </button>
                </form>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
