import React from "react";
import { Mail, Phone, MapPin, Linkedin, Instagram, Twitter } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="bg-gradient-to-br from-green-800 to-green-600 text-white py-16 px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Left Column */}
      <div className="space-y-8">
        <h2 className="text-4xl font-bold leading-snug">
          Let's talk <br /> on something great <br /> together
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="text-white" />
            <a href="mailto:mmsumerchshop@gmail.com" className="hover:underline">
              mmsumerchshop@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="text-white" />
            <a href="tel:+639123456789" className="hover:underline">
              +63 912 345 6789
            </a>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="text-white" />
            <a
              href="https://www.google.com/maps/search/?api=1&query=MMSU+Campus,+Ilocos+Norte"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              MMSU Campus, Ilocos Norte
            </a>
          </div>
        </div>
        <div className="flex gap-6 text-white text-2xl pt-4">
          <a href="https://www.linkedin.com/school/mariano-marcos-state-university/" target="_blank" rel="noopener noreferrer">
            <Linkedin />
          </a>
          <a href="https://www.instagram.com/mmsuofficial/" target="_blank" rel="noopener noreferrer">
            <Instagram />
          </a>
          <a href="https://x.com/MMSU_official" target="_blank" rel="noopener noreferrer">
            <Twitter />
          </a>
        </div>
      </div>

      {/* Right Column - Contact Form */}
      <div className="bg-white text-black rounded-xl p-8 space-y-6 shadow-xl">
        <p className="font-semibold text-lg text-green-800">I’m interested in:</p>
        <div className="flex flex-wrap gap-3">
          {['Shirt', 'Jacket', 'Cap', 'Tumbler', 'Bags'].map((item, i) => (
            <button
              key={i}
              className={`px-4 py-2 border rounded-full hover:bg-green-800 hover:text-white transition ${
                i === 0 ? 'bg-green-800 text-white' : 'border-green-800 text-green-800'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-green-800 font-semibold mb-1">Your name</p>
            <input
              type="text"
              placeholder="Juan Dela Cruz"
              className="w-full border-b-2 border-green-800 rounded-none px-2 py-2 focus:outline-none"
            />
          </div>
          <input
            type="email"
            placeholder="email@domain.com"
            className="w-full border-b px-2 py-2 focus:outline-none"
          />
          <textarea
            placeholder="Your message"
            className="w-full resize-none h-32 border px-2 py-2 focus:outline-none"
          />
          <button className="bg-green-800 w-full py-2 text-white rounded hover:bg-green-900 transition">
            Send message
          </button>
        </div>
      </div>
    </section>
  );
}
