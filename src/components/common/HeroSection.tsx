import Link from "next/link";
import React from "react";

const HeroSection: React.FC = () => {
  return (
    <>
      {" "}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-white rounded-full"></div>
        <div className="absolute top-20 right-10 w-40 h-40 bg-white rounded-full"></div>
        <div className="absolute bottom-10 left-1/4 w-60 h-60 bg-white rounded-full"></div>
      </div>
      <div className="relative z-10 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-fade-in">
          Welcome to Leap of Faith
        </h1>
        <p className="text-lg max-w-2xl mx-auto opacity-90">
          Sharing ideas, stories, and experiences about life, technology, and
          creative pursuits.
        </p>
        <Link
          href="/about"
          className="mt-8 inline-block bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-opacity-90 transition-all transform hover:translate-y-[-2px]"
        >
          Learn More About Me
        </Link>
      </div>
    </>
  );
};

export default HeroSection;
