import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="text-center  font-bold h-screen bg-blue-50">
      <h2 className="inline-block text-6xl bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text font-bold mt-40">
        404
      </h2>
      <p className="text-3xl mt-3 mb-2">Page Not Found</p>
      <p className="text-gray-500 mb-6 text-2xl">
        The page you're looking for does not seem to exist
      </p>

      <button className="bg-gradient-to-r text-2xl from-blue-400 to-blue-600 text-white px-6 py-4 rounded-lg">
        <Link to="/">Go to Home Page</Link>
      </button>
    </div>
  );
};

export default PageNotFound;
