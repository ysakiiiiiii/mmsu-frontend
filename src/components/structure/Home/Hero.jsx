import { motion } from "framer-motion";
import HeroImage from "./hero-image/hero-nobg.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthWrapper";
import { useContext } from "react";

const Button = ({ children, className, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-6 py-3 rounded-md font-medium shadow-md transition duration-300 ${className}`}
  >
    {children}
  </button>
);

export default function HeroSection() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const handleGetStarted = () => {
    navigate(user?.isAuthenticated ? "/about" : "/login");
  };

  return (
    <div className="relative bg-white py-15 px-5 md:px-12 lg:px-24 overflow-hidden min-h-[90vh] max-h-none">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between relative z-10">
        {/* Left Content */}
        <motion.div
          className="text-center lg:text-left max-w-xl space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-3xl md:text-6xl lg:text-7xl text-gray-900 leading-tight font-Bebas">
            LET'S GO!
            <br />
            <span className="text-green-800"> STAMPEDE </span>
            YOUR
            <span className="text-yellow-500"> FASHION </span>
            <br />
            ALL THE WAY TO TOP
          </h1>
          <p className="text-gray-500 font-Montserrat-Light text-xs">
            Celebrate the legacy of Mariano Marcos State University with
            high-quality apparel and essentials. Perfect for students, alumni,
            and true MMSU supporters.
          </p>
          <Button
            onClick={handleGetStarted}
            className="font-Poppins text-xs md:text-[15px] bg-green-600 text-white hover:bg-green-900"
          >
            Get Started
          </Button>

          {/* Stats */}
          <div className="mt-8 flex gap-6 justify-center lg:justify-start">
            <motion.div
              className="bg-white shadow p-4 rounded-xl text-center"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold">20+</h3>
              <p className="text-gray-500 text-sm">Apparels</p>
            </motion.div>
            <motion.div
              className="bg-white shadow p-4 rounded-xl text-center"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold">69K+</h3>
              <p className="text-gray-500 text-sm">Customer</p>
            </motion.div>
            <motion.div
              className="bg-white shadow p-4 rounded-xl text-center"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold">4.5+</h3>
              <p className="text-gray-500 text-sm">Overall Ratings</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Image with abstract shapes */}
        <motion.div
          className="relative w-full max-w-[800px]"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Rotating shape sized to image container */}
          <motion.div
            className="absolute top-[-10%%] left-[18%] w-[65%] h-[80%] bg-gradient-to-tr from-emerald-500 to-lime-400 rounded-[30%] -z-10"
            animate={{ rotate: [0, 360] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 20,
              ease: "linear",
            }}
          />

          {/* Abstract shapes on top */}
          <div className="absolute left-12 top-24 grid grid-cols-2 gap-2 z-10">
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-7 h-7 border-2 border-green-800 hover:border-yellow-600 rounded-md"
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>

          {/* Background Dots */}
          <motion.div
            className="absolute right-[10%] bottom-[5%] lg:right-30 lg:bottom-1 lg:block z-[1000]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="grid grid-cols-4 gap-5">
              {Array.from({ length: 16 }).map((_, i) => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full bg-green-800 hover:bg-yellow-500 hover:scale-140 transition-all duration-300"
                />
              ))}
            </div>
          </motion.div>

          {/* Image + Bottom Fade */}
          <div className="relative w-full -mt-4 mb-7 scale-110">
            <img
              src={HeroImage}
              alt="Hero Woman"
              className="w-full h-auto rounded-2xl relative z-10"
            />
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent rounded-b-2xl z-20" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
