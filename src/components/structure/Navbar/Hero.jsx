import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { AuthContext } from "../../../auth/AuthWrapper";
import Jacket from "../../../../public/product-image/jacket.png";
import Cap from "../../../../public/product-image/cap2.png";
import Tshirt from "../../../../public/product-image/tshirt.png";
import ToteBag from "../../../../public/product-image/tote.png";
import Tumbler from "../../../../public/product-image/tumblers.png";

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
    <div className="container max-w-full]">
      <div className="overflow-hidden rounded-3xl hero-bg-color flex justify-center items-center py-6 sm:py-16">
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
                      className="px-6 py-3 bg-white text-green-800 hover:bg-green-800 hover:text-white
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
    </div>
  );
};

export default Hero;
