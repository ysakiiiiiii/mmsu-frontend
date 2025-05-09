import React from "react";
import { FaShirt, FaUsers, FaMedal, FaTrophy } from "react-icons/fa6";

const AboutValues = () => {
  return (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <p className="text-green-700 uppercase font-medium text-sm tracking-wider font-Poppins">
          OUR VALUES
        </p>
        <h2 className="text-3xl lg:text-5xl font-Bebas">WHAT WE STAND FOR</h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg font-Poppins">
          These core values drive everything we do at MMSU Merchandise
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto mt-16 text-center">
        <div className="space-y-4 p-6 rounded-lg hover:bg-gray-50 transition">
          <FaShirt className="text-green-600 text-5xl mx-auto" />
          <h3 className="text-xl font-Poppins font-semibold">QUALITY APPAREL</h3>
          <p className="text-gray-600 font-Montserrat-Light">
            We use only premium materials that stand the test of time and
            school pride.
          </p>
        </div>
        <div className="space-y-4 p-6 rounded-lg hover:bg-gray-50 transition">
          <FaUsers className="text-green-600 text-5xl mx-auto" />
          <h3 className="text-xl font-Poppins font-semibold">COMMUNITY SPIRIT</h3>
          <p className="text-gray-600 font-Montserrat-Light">
            Every purchase supports student programs and university
            initiatives.
          </p>
        </div>
        <div className="space-y-4 p-6 rounded-lg hover:bg-gray-50 transition">
          <FaMedal className="text-green-600 text-5xl mx-auto" />
          <h3 className="text-xl font-Poppins font-semibold">SCHOOL PRIDE</h3>
          <p className="text-gray-600 font-Montserrat-Light">
            Our designs celebrate the rich heritage and achievements of MMSU.
          </p>
        </div>
        <div className="space-y-4 p-6 rounded-lg hover:bg-gray-50 transition">
          <FaTrophy className="text-green-600 text-5xl mx-auto" />
          <h3 className="text-xl font-Poppins font-semibold">CHAMPION MINDSET</h3>
          <p className="text-gray-600 font-Montserrat-Light">
            We embody the determination and excellence of MMSU athletes and
            scholars.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutValues;