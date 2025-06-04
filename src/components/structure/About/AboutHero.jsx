import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthWrapper";
import { useContext } from "react";
import Lucky from "./school/lucky.jpg";
import Lin from "./school/lin.jpg";
import Russel from "./school/russel.jpg";
import { motion } from "framer-motion";

const Button = ({ children, className, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-6 py-3 rounded-full font-medium shadow-md transition duration-300 ${className}`}
  >
    {children}
  </button>
);

const AboutHero = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const handleShopNow = () => {
    navigate(user?.isAuthenticated ? "/about" : "/login");
  };

  return (
    <section className="relative py-10 sm:py-20 px-4 text-center max-w-6xl mx-auto mt-5 md:mt-22 overflow-hidden">

      {/* Content container with relative positioning */}
      <div className="relative z-10">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl mb-8 font-Bebas">
          <span className="text-green-600">STAMPEDE</span> YOUR{" "}
          <span className="text-yellow-500">FASHION</span>
          <br /> ALL THE WAY TO THE TOP
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-sm sm:text-md md:text-xl font-Poppins">
          MMSU Merchandise is your premier destination for official university
          apparel and accessories. We embody the spirit of the Mariano Marcos
          State University with quality products that showcase your school
          pride.
        </p>
        <div className="flex justify-center gap-3 items-center">
          <div className="flex -space-x-2">
            <img
              src={Lucky}
              alt="student1"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <img
              src={Lin}
              alt="student2"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <img
              src={Russel}
              alt="student3"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          </div>
          <span className="text-sm text-gray-500">+5K Students</span>
        </div>
      </div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center -z-10"
        initial={{ scale: 1, opacity: 0.3 }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border-4 border-green-500/60" />
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center -z-10"
        initial={{ scale: 1, opacity: 0.3 }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full border-4 border-green-300/60" />
      </motion.div>
    </section>
  );
};

export default AboutHero;
