import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import NavBar from "../Component/NavBar";
import human1 from "../asset/human.svg";
import human2 from "../asset/human2.svg";
import human3 from "../asset/human3.svg";
import human4 from "../asset/human4.svg";
import human5 from "../asset/human5.svg";
import img from "../asset/about.jpg";

function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="home" id="home">
      <NavBar />
      <div className="content">
        <h1 className="mb-4 mt-20 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">A spot for creative to get a job</h1>
        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Unleash your skills, seize opportunities, shape your destiny. Join our
          team, where limitless possibilities await talented
          professionals like you.
        </p>
        <button
          className="btn-primary size-20 m-5 p-3  "
          onClick={() => navigate("/login")}
        >
          Get Started
        </button>
        <div className="flex divhuman">
          <img src={human1} alt="" />
          <img src={human2} alt="" />
          <img src={human3} alt="" />
          <img src={human4} alt="" />
          <img src={human5} alt="" />
        </div>
        <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900  dark:text-white">
          Welcome to GetDone, the ultimate platform connecting freelancers with
          clients. Find the perfect match for your project or discover exciting
          opportunities to showcase your skills.
        </h1>
      </div>

        <div className="row grid md:grid-cols-2">
          <div className="about mt-5 col-md-6">
            <h2 className="text-decoration-underline text-white ">About Us</h2>
            <p className="text-white  size-20 ">
              At GetDone, we believe in the power of talent and collaboration.
              Our mission is to empower freelancers and businesses by providing
              a seamless platform to connect, communicate, and succeed together.
              Whether you're a freelancer looking for projects or a client in
              search of top-notch talent, we've got you covered.
            </p>
            <h3 className="text-white">How it works:</h3>
            <ul className=" space-y-1 text-white list-disc list-inside ">
              <li>
                Create a Profile: Build a comprehensive profile that highlights
                your expertise, skills, and portfolio.
              </li>
              <li>
                Browse Projects: Explore a wide range of projects posted by
                clients in various industries.
              </li>
              <li>
                Submit Proposals: Craft compelling proposals and submit them to
                clients for consideration.
              </li>
              <li>
                Collaborate: Communicate with clients, ask questions, and
                discuss project details.
              </li>
              <li>
                Get Hired: Once your proposal is accepted, start working on the
                project and deliver outstanding results.
              </li>
              <li>
                Payment & Reviews: Receive secure payments and earn positive
                reviews to boost your professional reputation.
              </li>
            </ul>
          </div>

          <img src={img} className="about-img" alt="" />
        </div>
    </div>
  );
}

export default Home;
