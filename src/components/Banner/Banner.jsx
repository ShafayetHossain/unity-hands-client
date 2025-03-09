import React from "react";
import { motion } from "motion/react";
import { easeInOut } from "motion";
import happyvolunteer from "../../assets/images/happyvolunteer.jpg";
import { div } from "motion/react-client";

const Banner = () => {
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={happyvolunteer}
            className="max-w-sm rounded-lg shadow-2xl flex-1 hover:scale-100 scale-90  duration-1000 overflow-hidden"
          />
          <div className="flex-1">
            <motion.h1
              animate={{ x: [0, 50, 0] }}
              transition={{
                duration: 0.8,
                delay: 1,
                ease: easeInOut,
              }}
              className="text-5xl font-bold"
            >
              Hands For The People!{" "}
            </motion.h1>
            <p className="py-6">
              Volunteer platforms are online services that connect individuals
              willing to offer their time and skills with organizations that
              need volunteers.
            </p>
            <a href="#buttom" className="btn btn-primary">
              Get Started
            </a>
          </div>
        </div>
      </div>
      <span id="buttom"></span>
    </div>
  );
};

export default Banner;
