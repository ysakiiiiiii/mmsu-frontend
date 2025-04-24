import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { AuthContext } from "../../../auth/AuthWrapper";
import Jacket from "../../../../public/product-image/jacket.png";
import Cap from "../../../../public/product-image/cap2.png";
import Tshirt from "../../../../public/product-image/tshirt.png";
import ToteBag from "../../../../public/product-image/tote.png";
import Tumbler from "../../../../public/product-image/tumblers.png";
import { motion } from "framer-motion";

const HeroSlide = [
  {
    id: 1,
    img: Jacket,
    title: "Stallion ",
    title2: "Jacket",
    descriptions:
      "The Stallion Jacket combines bold style and rugged durability in a sleek, comfortable design built for any adventure.",
  },
  {
    id: 2,
    img: Cap,
    title: "Stallion ",
    title2: "Head Cap",
    descriptions:
      " A sleek, adjustable cap that blends comfort, breathability, and everyday cool for any occasion.",
  },
  {
    id: 3,
    img: Tshirt,
    title: "Stallion",
    title2: " T-Shirt",
    descriptions:
      "A lightweight, stretchy headband that keeps hair and sweat in check during workouts or busy days.",
  },
  {
    id: 4,
    img: ToteBag,
    title: "Stallion",
    title2: "Tote Bag",
    descriptions:
      "A spacious, durable tote designed for daily essentials, weekend hauls, and everything in between.",
  },
  {
    id: 5,
    img: Tumbler,
    title: "Stallion",
    title2: "Tumbler",
    descriptions:
      " A double-wall insulated tumbler that keeps your drinks at the perfect temperature wherever you go.",
  },
];

const Hero = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const handleBuyNow = () => {
    navigate(user?.isAuthenticated ? "/store" : "/login");
  };

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,

    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  return (
    <div
      className="min-h-screen px-4 sm:px-6 lg:px-12 xl:px-20 
                    pb-30
                    bg-gradient-to-b from-white to-blue-50"
    >
      {/* Text Product */}
      <div className="text-center py-10 px-4 md:px-10">
        <motion.h1
          className="font-Bebas text-5xl md:text-6xl text-gray-900"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.6 }}
        >
          Our
          <span className="text-green-800"> Clothing </span>
          <span className="text-yellow-500"> Collection </span>
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
      </div>

      <motion.div
        className="font-Bebas text-5xl md:text-6xl text-gray-900"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.6 }}
      >
        <div className="overflow-hidden rounded-3xl hero-bg-color flex justify-center items-center pb-6 sm:py-16">
          <div className="container">
            <Slider {...settings}>
              {HeroSlide.map((item) => (
                <div key={item.id}>
                  <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left px-4">
                    {/* Left: Title + Title2 */}
                    <div className="w-full md:w-1/3 flex flex-col gap-2 font-bold font-LibreBaskerville">
                      <div className="flex flex-wrap justify-center min-w-0 sm:justify-center md:justify-start gap-2">
                        <h1 className="text-2xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-6xl font-bold text-green-800 uppercase">
                          {item.title}
                        </h1>
                        <h2 className="text-2xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-6xl font-bold text-yellow-500 uppercase whitespace-nowrap">
                          {item.title2}
                        </h2>
                      </div>
                    </div>

                    {/* Center: Image + Buy Now */}
                    <div className="w-full md:w-1/3 flex flex-col items-center justify-between min-h-[300px] sm:min-h-[350px]">
                      <div className="flex-grow flex items-center justify-center relative">
                        {/* Product image */}
                        <img
                          src={item.img}
                          alt=""
                          className="relative z-10 w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] 
                                    h-auto object-contain drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)]"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleBuyNow}
                        className="px-6 py-3 text-sm sm:text-xl font-Poppins bg-white text-green-800 hover:bg-green-800 hover:text-white
                                rounded-xl shadow-md transform transition-transform duration-300 hover:scale-105 mt-4"
                      >
                        Buy Now
                      </button>
                    </div>

                    {/* Right: Description */}
                    <div className="w-full md:w-1/3">
                      <p className="text-sm font-Poppins sm:text-base md:text-lg text-gray-700 italic">
                        {item.descriptions}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
