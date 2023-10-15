import React from "react";
import Typewriter from "typewriter-effect";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="text-center mt-10 text-3xl font-bold">
        <h1>The best app for</h1>
        <Typewriter
          options={{
            strings: ["managing events", "collaborating with multiple people"],
            autoStart: true,
            loop: true,
          }}
        />
      </div>
      <div className="flex flex-col justify-center items-center mt-5">
        <h3 className="text-2xl font-semibold mb-4">
          Sign up to get started for free
        </h3>
        <button
          onClick={() => (window.location.href = "/loggin")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-300"
        >
          Sign In
        </button>
      </div>
      <Footer/>
    </div>
  );
};

export default Landing;
