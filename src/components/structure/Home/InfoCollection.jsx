import React from "react";
import { Truck, Percent, ShieldCheck, Headphones } from "lucide-react";
import ModelImg from "./hero-image/hero.jpg";
import Model1 from "./hero-image/model1_copy.jpg";
import Model2 from "./hero-image/model2.jpg";
import Model3 from "./hero-image/model3.jpg";
import Model4 from "./hero-image/model4.jpg";
import Model5 from "./hero-image/model5.jpg";
import Model6 from "./hero-image/model6.jpg";
import Model7 from "./hero-image/model7.jpg";
import Model8 from "./hero-image/model8.jpg";
import { motion } from "framer-motion";

const FashionCollection = () => {
  return (
    <section className="px-3 py-12 lg:px-11 bg-gradient-to-b from-blue-50 to-white">
      <div className="text-center pb-10 px-4 md:px-10">
        <motion.h1
          className="font-Bebas text-5xl md:text-6xl text-gray-900"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.6 }}
        >
          <span className="text-green-800"> BROWSE </span>
          THROUGH OUR
          <span className="text-yellow-500"> STORE </span>
        </motion.h1>

        <motion.p
          className="font-Poppins text-base md:text-lg text-gray-700 mt-4 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.9 }}
          viewport={{ once: true, amount: 0.6 }}
        >
          Discover fashion that speaks louder than words. Step into style, turn
          up the heat, and lead the way with our bold, curated collections.
        </motion.p>

        <motion.div
          className="h-[2px] bg-black mx-auto mt-6"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "100%", opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.6 }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 font-Montserrat-Light">
        {/* Left: Main Collection Banner */}
        <div className="relative rounded-2xl overflow-hidden group h-[450px] md:h-[600px]">
          {/* Background image with hover scale */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 z-10"
            style={{ backgroundImage: `url(${ModelImg})` }}
          />

          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent rounded-b-2xl z-15" />

          {/* Content */}
          <div className="relative z-20 p-6 flex items-end h-full">
            <div className="space-y-3 text-white">
              <h2 className="text-2xl font-bold">Heat the season</h2>
              <p>Find the new collection in this season</p>
              <button className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-800 transition">
                SHOP NOW
              </button>
            </div>
          </div>
        </div>

        {/* Right: Category Cards */}
        <div className="grid grid-cols-2 gap-4 lg:col-span-2">
          {[
            {
              title: "Bags",
              count: "5+",
              bg: "orange",
              img: Model1,
            },
            {
              title: "Accessories",
              count: "10++",
              bg: "rose",
              img: Model2,
            },
            {
              title: "Men",
              count: "20+",
              bg: "green",
              img: Model7,
            },
            {
              title: "Women",
              count: "32+",
              bg: "purple",
              img: Model8,
            },
          ].map(({ title, count, img }) => (
            <div
              key={title}
              className="relative rounded-2xl overflow-hidden group h-60 sm:h-72"
            >
              {/* Background image with hover scale */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${img})` }}
              />

              {/* Gradient overlay */}
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent z-10" />

              {/* Text content */}
              <div className="relative z-20 p-4 text-white flex flex-col justify-end h-full">
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="text-sm text-gray-200">{count} Collections</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Icons with Lucide React Icons */}
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center py-20">
        <div className="flex flex-col items-center">
          <Truck className="h-10 w-10 text-green-800 mb-2" />
          <p className="font-semibold">Delivery</p>
          <span className="text-sm text-gray-500">
            Shipping option to your place
          </span>
        </div>

        <div className="flex flex-col items-center">
          <Percent className="h-10 w-10 text-green-800 mb-2" />
          <p className="font-semibold">Discount</p>
          <span className="text-sm text-gray-500">Get member discount</span>
        </div>

        <div className="flex flex-col items-center">
          <ShieldCheck className="h-10 w-10 text-green-800 mb-2" />
          <p className="font-semibold">Safety</p>
          <span className="text-sm text-gray-500">Payment protection</span>
        </div>

        <div className="flex flex-col items-center">
          <Headphones className="h-10 w-10 text-green-800 mb-2" />
          <p className="font-semibold">Contact</p>
          <span className="text-sm text-gray-500">Online support 24/7</span>
        </div>
      </div>
    </section>
  );
};

export default FashionCollection;
