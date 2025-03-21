import { auth } from "../firebase/firebase.init";
import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

export const ContextProvider = createContext();

const Provider = ({ children }) => {
  const [userAcount, setUserAcount] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const provider = new GoogleAuthProvider();
  const signWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUser = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserAcount(currentUser);

      if (currentUser?.email) {
        const user = { email: currentUser.email };
        axios
          .post(
            "https://unity-hand-server.vercel.app/jwt",
            user,
            { withCredentials: true }
          )
          .then((res) => res?.data);
          setLoading(false);
      }

      else{
        axios
        .post(
          "https://unity-hand-server.vercel.app/logout",
          {},
          { withCredentials: true }
        )
        .then((res) => res?.data);
        setLoading(false);
      }

    });
    return () => unsubscribe();
  }, []);

  const notifySuccess = (message) => {
    toast.success(`${message}! 🎉`, {
      position: "top-center",
      autoClose: 2000, // Closes in 1 seconds
      theme: "dark",
    });
  };

  const notifyWarning = (message) => {
    toast.error(`${message}! ⚠️`, {
      position: "top-center",
      autoClose: 4000,
      theme: "dark",
    });
  };

  const notifyError = (message) => {
    toast.error(`${message}! ❌`, {
      position: "top-center",
      autoClose: 6000,
      theme: "dark",
    });
  };

  const authInfo = {
    userAcount,
    setUserAcount,
    createUser,
    signInUser,
    signOutUser,
    updateUser,
    signWithGoogle,
    resetPassword,
    loading,
    setLoading,
    notifySuccess,
    notifyError,
    notifyWarning,
  };

  return (
    <ContextProvider.Provider value={authInfo}>
      <>
        {children}
        <ToastContainer />
      </>
    </ContextProvider.Provider>
  );
};

export default Provider;
