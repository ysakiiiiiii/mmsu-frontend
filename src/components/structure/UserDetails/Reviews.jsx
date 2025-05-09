import React from "react";

const ReviewsSection = () => (
  <section className="bg-white p-3 sm:p-6 shadow rounded-lg sm:rounded-xl">
    <h2 className="text-base sm:text-xl font-bold mb-2 sm:mb-4">Reviews & Ratings</h2>
    <div className="flex items-center justify-center p-4 sm:p-6 bg-gray-50 rounded">
      <p className="text-xs sm:text-sm text-gray-600">No reviews submitted yet.</p>
    </div>
    <button className="mt-3 sm:mt-4 text-xs sm:text-sm text-blue-500 hover:text-blue-700 font-medium">
      Write a Review
    </button>
  </section>
);

export default ReviewsSection;