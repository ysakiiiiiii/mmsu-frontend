import React, { useState } from "react";
import { FaFacebook, FaInstagramSquare, FaTwitter } from "react-icons/fa";
import Lucky from "./school/lucky.jpg";
import Lin from "./school/lin.jpg";
import Russel from "./school/russel.jpg";

const team = [
  {
    name: "Lucky Francis Acidera",
    title: "Co-Founder",
    desc: "Growing up, I was always the quiet one in the room, content to observe and listen rather than speak up.",
    img: Lucky,
    facebook: "https://www.facebook.com/akiiiii.523", 
    instagram: "https://www.instagram.com/akiidokiee/",
    twitter: "https://x.com/kishoryy",
  },
  {
    name: "Lin Anthony Pineda",
    title: "Marketing Director",
    desc: "I realized that my reluctance to speak up was holding me back from truly connecting with others.",
    img: Lin,
    facebook: "https://www.facebook.com/AmeOnna.o7",
    instagram: "https://www.instagram.com/laaampx", 
    twitter: "https://x.com/MythB1tch",
  },
  {
    name: "Russel Daguimol",
    title: "Creative Director",
    desc: "The mere thought of standing in front of my peers made my heart race, but I knew it was time to face my fears.",
    img: Russel,
    facebook: "https://www.facebook.com/russel.daguimol.09", 
    instagram: "https://www.instagram.com/r.ssl_dgml/", 
    twitter: "https://x.com/_russel09",
  },
];

const TeamCard = ({ member }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="relative w-full h-full perspective-1000"
      onClick={handleClick}
    >
      {/* Card Container */}
      <div className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
        isFlipped ? 'rotate-y-180' : ''
      } group-hover:rotate-y-180`}>
        {/* Front of Card */}
        <div className="absolute inset-0 backface-hidden bg-white rounded-xl overflow-hidden shadow-lg">
          <img
            src={member.img}
            alt={member.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
            <h3 className="text-xl font-bold">{member.name}</h3>
            <p className="text-green-300 font-medium">{member.title}</p>
          </div>
        </div>

        {/* Back of Card */}
        <div className="absolute inset-0 backface-hidden bg-white rounded-xl p-8 flex flex-col justify-center items-center text-center shadow-lg rotate-y-180">
          <p className="text-gray-600 mb-4">{member.desc}</p>
          <div className="flex justify-center gap-6 text-green-600 text-xl pt-4">
            {member.facebook && ( 
              <a href={member.facebook} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                <FaFacebook className="cursor-pointer hover:text-green-800 transition" />
              </a>
            )}
            {member.instagram && ( 
              <a href={member.instagram} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                <FaInstagramSquare className="cursor-pointer hover:text-green-800 transition" />
              </a>
            )}
            {member.twitter && ( 
              <a href={member.twitter} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                <FaTwitter className="cursor-pointer hover:text-green-800 transition" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutTeam = () => {
  return (
    <section className="relative py-20 px-4 max-w-6xl mx-auto">

      <div className="space-y-6 mb-16 text-center">
        <p className="text-green-800 font-Poppins tracking-wider ">
          MEET THE TEAM
        </p>
        <h2 className="text-4xl md:text-5xl font-Bebas">THE
         <span className="text-green-700"> FACES </span>
         BEHIND MMSU
         <span className="text-yellow-500"> MERCH</span></h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-md sm:text-lg font-Poppins">
          Our dedicated team works tirelessly to bring you the best university
          merchandise.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 relative">
        {team.map((member, index) => (
          <div key={index} className="h-96 group">
            <TeamCard member={member} />
          </div>
        ))}
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
};

export default AboutTeam;