import React from "react";
import { motion } from "framer-motion";
import {
  FaTshirt,
  FaTruck,
  FaLaptopCode,
  FaFire,
  FaBoxes,
  FaComments,
} from "react-icons/fa";

const services = [
  {
    title: "Custom Merchandise",
    desc: "Personalized shirts, hoodies, and mugs with your name or department.",
    icon: <FaTshirt className="text-3xl text-green-800" />,
  },
  {
    title: "On-Campus Delivery",
    desc: "We deliver straight to your dorm or office — fast & free.",
    icon: <FaTruck className="text-3xl text-green-800" />,
  },
  {
    title: "Design Lab Access",
    desc: "Create your own merch using campus tools and templates.",
    icon: <FaLaptopCode className="text-3xl text-green-800" />,
  },
  {
    title: "Exclusive Drops",
    desc: "Be first in line for limited-edition collections.",
    icon: <FaFire className="text-3xl text-green-800" />,
  },
  {
    title: "Bulk Orders for Orgs",
    desc: "Discounted rates for orgs and event giveaways.",
    icon: <FaBoxes className="text-3xl text-green-800" />,
  },
  {
    title: "24/7 Chat Support",
    desc: "Our merch team is always online for your questions.",
    icon: <FaComments className="text-3xl text-green-800" />,
  },
];

const MMSUServices = () => {
  return (
    <section className="min-h-[110vh] py-15 px-6 text-center bg-white font-Montserrat-Light">
      <div className="text-center pb-10 px-4 md:px-10">
              <motion.h1
                className="font-Bebas text-5xl md:text-6xl text-gray-900"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: false, amount: 0.5 }}
              >
               OUR
                <span className="text-yellow-500"> GOLDEN </span>
                <span className="text-green-800"> SERVICE </span>
              </motion.h1>
      
              <motion.p
                className="font-Poppins text-base md:text-lg text-gray-700 mt-4 max-w-2xl mx-auto"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: false, amount: 0.5 }}
              >
                Discover fashion that speaks louder than words. Step into style, turn
                up the heat, and lead the way with our bold, curated collections.
              </motion.p>
      
            </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {services.map(({ title, desc, icon }, i) => (
          <motion.div
            key={title}
            className="bg-white border border-gray-200 rounded-2xl p-6 text-left shadow-sm hover:shadow-md transition"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            viewport={{ once: false, amount: 0.5 }}
          >
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-semibold text-black mb-2">{title}</h3>
            <p className="text-sm text-gray-600">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MMSUServices;
