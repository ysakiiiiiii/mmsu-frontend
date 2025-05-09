import React from "react";
import School from "./school/school.jpg"

const AboutHistory = () => {
  return (
    <section className="bg-gray-50 py-20 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h3 className="text-md text-gray-500 uppercase tracking-wider font-Poppins">
            OUR STORY
          </h3>
          <h2 className="text-5xl font-Bebas">HOW WE STARTED</h2>
          <p className="text-gray-600 text-lg leading-relaxed font-Poppins">
            Founded in 2015 by a group of passionate MMSU students, MMSU
            Merchandise began as a small campus initiative. What started as a
            way to promote school spirit has grown into the official
            merchandise provider for Mariano Marcos State University.
          </p>
          <div className="border-l-4 border-green-600 pl-6 py-2 text-gray-700 italic">
            <p className="text-lg">
              "Wearing MMSU Merchandise makes me proud to be part of this
              institution. The quality and designs are exceptional!"
            </p>
            
            <div className="mt-4">
              <span className="block font-semibold text-gray-800">
                Lucky Francis Acidera
              </span>
              <span className="block text-gray-500">MMSU Student Leader</span>
            </div>
          </div>
        </div>
        <img
          src={School}
          alt="MMSU Team"
          className="rounded-xl shadow-lg w-full"
        />
      </div>
    </section>
  );
};

export default AboutHistory;