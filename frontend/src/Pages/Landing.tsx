import React from "react";
import { motion, useAnimation } from "framer-motion";
import { TbChartInfographic } from "react-icons/tb";
import { BsClipboardData } from "react-icons/bs";
import { FaArrowCircleDown } from "react-icons/fa";
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
        className=" py-16 flex lg:flex-row flex-col justify-center items-center gap-10 lg:gap-5"
        initialX={-80}
      >
        <div className="shadow-2xl backdrop-blur-sm  rounded-3xl xl:w-1/3 w-[300px] lg:w-[330px]  lg:h-[260px] xl:h-[200px] h-[250px] lg:py-4  flex lg:flex-row  justify-center items-center gap-3 px-3 bg-neutral-200">
          <div className="w-1/4 justify-center items-center flex">
            <TbChartInfographic size={50} />
          </div>
          <div className="flex flex-col gap-2 w-3/4 break-words py-6">
            <h1 className="font-bold text-xl">Watch your data come to life!</h1>
            <p className="font-serif">
              Get live, dynamic visualizations that update in real-time, helping
              you make swift, informed decisions.
            </p>
          </div>
        </div>

        <div className="shadow-2xl backdrop-blur-sm  rounded-3xl xl:w-1/3 w-[300px] lg:w-[330px] lg:h-[260px] xl:h-[200px] h-[250px] lg:py-4  flex lg:flex-row  justify-center items-center gap-3 px-3 bg-neutral-200">
          <div className="w-1/4 justify-center items-center flex">
            <BsClipboardData size={50} />
          </div>
          <div className="flex flex-col gap-2 w-3/4 break-words py-6">
            <h1 className="font-bold text-xl">
              Turn data into stunning visuals!
            </h1>
            <p className="font-serif">
              Transform complex data into clear, beautiful graphics that reveal
              patterns and insights at a glance.
            </p>
          </div>
        </div>

        <div className="shadow-2xl backdrop-blur-sm  rounded-3xl xl:w-1/3 w-[300px] lg:w-[330px] lg:h-[260px] xl:h-[200px] h-[250px] lg:py-4  flex lg:flex-row  justify-center items-center gap-3 px-3 bg-neutral-200">
          <div className="w-1/4 justify-center items-center flex">
            <TbChartInfographic size={50} />
          </div>
          <div className="flex flex-col gap-2 w-3/4 break-words py-6">
            <h1 className="font-bold text-xl">
              Uncover deeper insights from your data!
            </h1>
            <p className="font-serif">
              Our advanced analytics will offer powerful tools to extract
              valuable insights and drive smarter decisions.
            </p>
          </div>
        </div>
      </AnimatedSection>

      <motion.div
        className="my-2"
        animate={{ y: [0, 20, 0] }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <FaArrowCircleDown
          className="relative left-1/2 transform -translate-x-1/2"
          size={80}
        />
      </motion.div>

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
