import React from "react";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaShirt, FaUsers, FaMedal, FaTrophy } from "react-icons/fa6";
import FooterSection from "../structure/Home/Footer"

const team = [
  {
    name: "Albert Flores",
    title: "Co-Founder",
    desc: "Growing up, I was always the quiet one in the room, content to observe and listen rather than speak up.",
    img: "/images/albert.jpg",
  },
  {
    name: "Theresa Webb",
    title: "Marketing Director",
    desc: "I realized that my reluctance to speak up was holding me back from truly connecting with others.",
    img: "/images/theresa.jpg",
  },
  {
    name: "Bessie Cooper",
    title: "Creative Director",
    desc: "The mere thought of standing in front of my peers made my heart race, but I knew it was time to face my fears.",
    img: "/images/bessie.jpg",
  },
];

const About = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section with increased spacing */}
      <section className="py-20 px-4 text-center max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">
          <span className="text-green-600">STAMPEDE</span> YOUR{" "}
          <span className="text-yellow-500">FASHION</span>
          <br /> ALL THE WAY TO THE TOP
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">
          MMSU Merchandise is your premier destination for official university
          apparel and accessories. We embody the spirit of the Mariano Marcos
          State University with quality products that showcase your school
          pride.
        </p>
        <div className="mb-10">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full transition">
            SHOP NOW
          </button>
        </div>
        <div className="flex justify-center gap-3 items-center">
          <div className="flex -space-x-2">
            <img
              src="/images/student1.jpg"
              alt="student1"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <img
              src="/images/student2.jpg"
              alt="student2"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <img
              src="/images/student3.jpg"
              alt="student3"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          </div>
          <span className="text-sm text-gray-500">+5K Students</span>
        </div>
      </section>

      {/* History Section */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h3 className="text-sm text-gray-500 uppercase tracking-wider">
              OUR STORY
            </h3>
            <h2 className="text-3xl font-bold">HOW WE STARTED</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
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
                  Juan Dela Cruz
                </span>
                <span className="block text-gray-500">MMSU Student Leader</span>
              </div>
            </div>
          </div>
          <img
            src="/images/mmsu-team.jpg"
            alt="MMSU Team"
            className="rounded-xl shadow-lg w-full"
          />
        </div>
      </section>

      {/* Vision Section*/}
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className="text-gray-500 uppercase font-medium text-sm tracking-wider">
            OUR VALUES
          </p>
          <h2 className="text-3xl font-bold">WHAT WE STAND FOR</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            These core values drive everything we do at MMSU Merchandise
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto mt-16 text-center">
          <div className="space-y-4 p-6 rounded-lg hover:bg-gray-50 transition">
            <FaShirt className="text-green-600 text-5xl mx-auto" />
            <h3 className="text-xl font-semibold">QUALITY APPAREL</h3>
            <p className="text-gray-600">
              We use only premium materials that stand the test of time and
              school pride.
            </p>
          </div>
          <div className="space-y-4 p-6 rounded-lg hover:bg-gray-50 transition">
            <FaUsers className="text-green-600 text-5xl mx-auto" />
            <h3 className="text-xl font-semibold">COMMUNITY SPIRIT</h3>
            <p className="text-gray-600">
              Every purchase supports student programs and university
              initiatives.
            </p>
          </div>
          <div className="space-y-4 p-6 rounded-lg hover:bg-gray-50 transition">
            <FaMedal className="text-green-600 text-5xl mx-auto" />
            <h3 className="text-xl font-semibold">SCHOOL PRIDE</h3>
            <p className="text-gray-600">
              Our designs celebrate the rich heritage and achievements of MMSU.
            </p>
          </div>
          <div className="space-y-4 p-6 rounded-lg hover:bg-gray-50 transition">
            <FaTrophy className="text-green-600 text-5xl mx-auto" />
            <h3 className="text-xl font-semibold">CHAMPION MINDSET</h3>
            <p className="text-gray-600">
              We embody the determination and excellence of MMSU athletes and
              scholars.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto text-center bg-gray-50">
        <div className="space-y-6 mb-16">
          <p className="text-green-600 font-semibold tracking-wider">
            MEET THE TEAM
          </p>
          <h2 className="text-3xl font-bold">THE FACES BEHIND MMSU MERCH</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Our dedicated team works tirelessly to bring you the best university
            merchandise.
          </p>
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-8 text-center space-y-4"
            >
              <img
                src={member.img}
                alt={member.name}
                className="mx-auto w-32 h-32 object-cover rounded-full mb-6 border-4 border-green-100"
              />
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-green-600 font-medium">{member.title}</p>
              <p className="text-gray-600 mt-4">{member.desc}</p>
              <div className="flex justify-center gap-6 text-green-600 text-xl pt-4">
                <FaLinkedin className="cursor-pointer hover:text-green-800 transition" />
                <FaTwitter className="cursor-pointer hover:text-green-800 transition" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section*/}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="space-y-6 mb-12">
          <h2 className="text-3xl font-bold">FREQUENTLY ASKED QUESTIONS</h2>
          <p className="text-gray-600 text-lg">
            Have questions about MMSU Merchandise? We've got answers!
          </p>
        </div>
        <div className="space-y-6">
          {[
            {
              question: "What payment methods do you accept?",
              answer:
                "We accept GCash, Maya, credit/debit cards, and cash on delivery. Campus pickup payments can be made in cash at our office.",
            },
            {
              question: "How can I get my MMSU Merchandise?",
              answer:
                "You can order online for delivery anywhere in the Philippines or visit our campus store at the MMSU Student Center.",
            },
            {
              question: "Are your products officially licensed by MMSU?",
              answer:
                "Yes! We are the official merchandise partner of Mariano Marcos State University.",
            },
            {
              question:
                "Do you offer bulk discounts for student organizations?",
              answer:
                "Registered student organizations can email us for special group pricing starting at 15% for orders of 20+ items.",
            },
            {
              question: "What's your return/exchange policy?",
              answer:
                "We offer hassle-free returns within 7 days for defective items and size exchanges within 3 days.",
            },
          ].map((item, index) => (
            <details
              key={index}
              className="border border-gray-300 rounded-xl p-6 hover:bg-gray-50 transition"
            >
              <summary className="cursor-pointer font-semibold text-lg flex justify-between items-center">
                {item.question}
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </summary>
              <p className="mt-4 text-gray-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
      <FooterSection/>
    </div>
  );
};

export default About;
