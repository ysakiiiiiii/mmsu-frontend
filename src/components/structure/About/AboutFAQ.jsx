import React from "react";

const faqs = [
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
    question: "Do you offer bulk discounts for student organizations?",
    answer:
      "Registered student organizations can email us for special group pricing starting at 15% for orders of 20+ items.",
  },
  {
    question: "What's your return/exchange policy?",
    answer:
      "We offer hassle-free returns within 7 days for defective items and size exchanges within 3 days.",
  },
];

const AboutFAQ = () => {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <div className="space-y-6 mb-12">
        <h2 className="text-4xl  sm:text-4xl md:text-5xl font-Bebas">
          FREQUENTLY ASKED QUESTIONS
        </h2>
        <p className="text-gray-600 text-sm sm:text-md md:text-lg font-Poppins">
          Have questions about MMSU Merchandise? We've got answers!
        </p>
      </div>
      <div className="space-y-6">
        {faqs.map((item, index) => (
          <details
            key={index}
            className="border border-gray-300 rounded-xl p-6 hover:bg-gray-50 transition"
          >
            <summary className="cursor-pointer font-Poppins font-semibold text-sm sm:text-md md:text-lg flex justify-between items-center">
              {item.question}
              {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
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
                />
              </svg>
            </summary>
            <p className="mt-4 text-gray-600 font-Montserrat-Light text-sm sm:text-md md:text-lg">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default AboutFAQ;
