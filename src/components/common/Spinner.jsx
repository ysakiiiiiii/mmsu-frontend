import React from "react";
import { ColorRing } from "react-loader-spinner";

const Spinner = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
      <p className="mt-4 text-gray-600">{message}</p>
    </div>
  );
};

export default Spinner;
