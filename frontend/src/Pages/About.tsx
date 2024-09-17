import React from "react";

const About: React.FC = () => {
  return (
    <div className="min-h-screen">
      <section className=" py-16 border-diminished-b">
        <div className="container mx-auto text-center backdrop-blur-lg">
          <h1 className="text-6xl font-bold">About Us</h1>
          <p className="mt-4 text-xl text-gray-700 w-3/4 mx-auto">
            We're revolutionizing the way people interact with mathematical
            functions through real-time graphing and data visualization.
          </p>
        </div>
      </section>

      <section className="py-32 border-diminished-b">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-semibold">Our Story</h2>
          <p className="mt-6 text-lg w-3/4 mx-auto text-gray-600">
            Driven by a passion for making complex data accessible, we've built
            a platform that takes graphing and data visualization to the next
            level. Whether you're visualizing mathematical functions or
            analyzing large data sets, our tools empower students, educators,
            and analysts alike to gain deeper insights effortlessly—and it's
            completely free! Experience real-time graphing that transforms how
            you see and interact with data.
          </p>
        </div>
      </section>

      <section className="py-32 border-diminished-b">
        <div className="container mx-auto w-3/4">
          <h2 className="text-5xl font-semibold text-center">Our Mission</h2>
          <p className="mt-6 text-lg text-gray-600 text-center">
            Our mission is to provide cutting-edge, specialized tools designed
            to improve efficiency and precision in graphing, data visualization,
            and analytics. By offering intuitive, real-time solutions, we
            empower users to effortlessly transform raw data into actionable
            insights. Whether you're working on mathematical functions,
            analyzing trends, or exploring complex datasets, our platform
            streamlines the process, helping you unlock the full potential of
            your data. We're committed to enhancing productivity, understanding,
            and innovation in every aspect of data analysis—completely free and
            accessible to all
          </p>
        </div>
      </section>
      <section className=" py-12">
        <div className="container mx-auto text-center text-black">
          <h2 className="text-3xl font-bold">Want to Learn More?</h2>
          <p className="mt-4 text-lg">
            Get in touch with us or explore our products to see how we can help
            you visualize your data better.
          </p>
          <button className="mt-6 px-8 py-4 bg-blue-500 text-white hover:bg-blue-600 transition-colors font-bold rounded-md">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
