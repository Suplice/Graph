import React from "react";
import { motion, useAnimation } from "framer-motion";
import AnimatedSection from "../Components/AnimatedSection";

const Landing: React.FC = () => {
  return (
    <div className="w-full h-full text-gray-900 flex flex-col gap-10">
      {/* Header Section */}
      <AnimatedSection
        className="text-left  py-20 flex flex-row justify-center items-center gap-10 flex-wrap "
        initialX={80}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full md:w-1/2 flex flex-col gap-8 z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold text-left leading-tight text-gray-800">
              Elevate Your Graphing Experience
            </h1>
            <p className="text-lg md:text-2xl text-left text-gray-600 w-5/6 font-serif">
              Discover Grapher, the ultimate tool for advanced graphing. Whether
              you're a data analyst, scientist, or enthusiast, our platform
              offers powerful features that make visualizing data easier and
              more intuitive than ever before.
            </p>
          </div>
          <div className="w-full md:w-1/2 backdrop-blur-lg">
            <img
              src="/Images/MainGraphPerson.png"
              alt="Features 1"
              className="w-full h-full rounded-lg -translate-x-10 z-0 drop-shadow-2xl"
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Introduction Section */}
      <AnimatedSection
        className="px-6 py-16 flex lg:flex-row flex-col justify-around items-center gap-10 lg:gap-0"
        initialX={-80}
      >
        <div className="border border-sky-500  rounded-3xl lg:w-1/3 w-[300px] p-5 text-wrap flex lg:flex-row flex-col">
          <div>Znaczek</div>
          <div>
            <h1>Real-Time Graphing</h1>
            <p>dddddddddddddddddddddd</p>
          </div>
        </div>
        <div>Feature Two Quick</div>
        <div>Feature three quick</div>
      </AnimatedSection>

      {/* Feature 1 Section */}
      <AnimatedSection
        className="flex flex-col md:flex-row items-center py-12 px-6"
        initialX={80}
      >
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold">Feature 1: Real-Time Graphing</h2>
          <p className="mt-4 text-lg">
            Create and manipulate graphs in real-time with intuitive controls
            and instant feedback. Visualize data dynamically.
          </p>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 md:pl-12">
          <img
            src="https://via.placeholder.com/500"
            alt="Feature 1"
            className="rounded-lg shadow-lg"
          />
        </div>
      </AnimatedSection>

      {/* Feature 2 Section */}
      <AnimatedSection
        className="flex flex-col md:flex-row items-center py-12 px-6 bg-gray-200"
        initialX={-80}
      >
        <div className="md:w-1/2 md:order-2">
          <h2 className="text-3xl font-bold">Feature 2: Data Visualization</h2>
          <p className="mt-4 text-lg">
            Easily visualize complex datasets and discover insights through
            beautiful and interactive graphs.
          </p>
        </div>
        <div className="md:w-1/2 md:order-1 mt-8 md:mt-0 md:pr-12">
          <video className="rounded-lg shadow-lg" controls>
            <source src="https://via.placeholder.com/500" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </AnimatedSection>

      {/* Call to Action */}
      <AnimatedSection
        className="text-center py-16 bg-gradient-to-b from-purple-500 to-indigo-600 text-white"
        initialX={80}
      >
        <h2 className="text-4xl font-bold">Ready to start graphing?</h2>
        <p className="text-xl mt-4">
          Sign up today and take your data visualization to the next level with
          Grapher.
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg font-bold rounded-lg">
          Get Started
        </button>
      </AnimatedSection>
    </div>
  );
};

export default Landing;
