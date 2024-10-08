import React from "react";
import { motion } from "framer-motion";
import { TbChartInfographic } from "react-icons/tb";
import { BsClipboardData } from "react-icons/bs";
import { FaArrowCircleDown } from "react-icons/fa";
import AnimatedSection from "../../Components/Animations/AnimatedSection";
import { NavLink } from "react-router-dom";

const Landing: React.FC = () => {
  return (
    <div className="w-full h-full text-gray-900 flex flex-col gap-10">
      {/* Header Section */}
      <AnimatedSection
        className="flex flex-col-reverse md:flex-row py-12 px-6 justify-center items-center gap-10 md:gap-0 "
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
        className="my-16"
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

      <AnimatedSection
        className="flex flex-col-reverse md:flex-row py-12 px-6 justify-center items-center gap-10 md:gap-0 "
        initialX={80}
      >
        <div className="md:w-1/2 mt-8 md:mt-0  flex justify-center items-center">
          <div>
            <img
              src="/Images/GrahpPhoto2.png"
              alt="Feature 1"
              className="w-auto transform scale-150"
            />
          </div>
        </div>

        <div className="md:w-1/2 flex flex-col items-center gap-10">
          <h2 className="text-6xl font-extrabold  text-left">
            Real-Time Graphing
          </h2>
          <p className="text-lg md:text-xl text-left text-gray-600 w-5/6 font-serif leading-relaxed">
            Effortlessly graph and manipulate equations dynamically, making it
            an ideal solution for educators, students, and data analysts. This
            feature offers instant visual feedback as you adjust parameters,
            providing a deeper understanding of mathematical concepts and their
            real-world applications. you adjust parameters, giving you a deeper
            understanding of mathematical concepts and their real-world
            applications.
          </p>
        </div>
      </AnimatedSection>

      <div className="flex justify-center items-center">
        <NavLink to="/SignIn">
          <motion.button
            className="shadow-xl shadow-slate-700 w-72 h-20 rounded-3xl text-2xl font-bold bg-zinc-500 text-white  my-40"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Try it out!
          </motion.button>
        </NavLink>
      </div>

      <AnimatedSection
        className="flex flex-col-reverse md:flex-row-reverse  px-6 justify-center mb-10  items-center gap-10 md:gap-0  "
        initialX={-80}
      >
        <div className="md:w-1/2 mt-8 md:mt-0  flex justify-center items-center">
          <div>
            <img
              src="/Images/PersonOnGraphFeatureOne2.png"
              alt="Feature 1"
              className="w-auto transform scale-150"
            />
          </div>
        </div>

        <div className="md:w-1/2 flex flex-col items-center gap-10 ">
          <h2 className="md:text-6xl text-5xl font-extrabold  text-left">
            Data Visualization
          </h2>
          <p className="text-lg md:text-xl text-left text-gray-600 w-5/6 font-serif ">
            Our Data Visualization feature empowers you to create compelling
            graphs and charts from a variety of data sources. Whether you're
            importing data from Excel spreadsheets or manually entering it, our
            tool provides seamless integration and instant, interactive
            visualizations.
          </p>
        </div>
      </AnimatedSection>

      {/* Call to Action */}
      <AnimatedSection
        className="text-center py-24 my-20 border-diminished-t flex flex-col justify-center items-center"
        initialX={80}
      >
        <h2 className="text-6xl font-bold">Ready to start graphing?</h2>
        <p className="text-xl mt-4">
          Sign up today and take your data visualization to the next level with
          Grapher.
        </p>
        <NavLink to="/SignIn">
          <button className="mt-6 px-10 py-5 bg-blue-500 hover:bg-blue-600 text-white text-lg font-bold rounded-2xl shadow-lg shadow-gray-700">
            Get Started
          </button>
        </NavLink>
      </AnimatedSection>
    </div>
  );
};

export default Landing;
