import React from "react";
import "bootstrap/dist/css/bootstrap.css";
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
        <h1 className="w-md-50 text-light">A spot for creative to get a job</h1>
        <p className="text-light w-md-50">
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
        <div className="d-flex justify-content-between divhuman  w-75">
          <img src={human1} alt="" />
          <img src={human2} alt="" />
          <img src={human3} alt="" />
          <img src={human4} alt="" />
          <img src={human5} alt="" />
        </div>
        <h1 className="w-50 text-light">
          Welcome to GetDone, the ultimate platform connecting freelancers with
          clients. Find the perfect match for your project or discover exciting
          opportunities to showcase your skills.
        </h1>
      </div>

      <footer className="mt-5 container-fluid">
        <div className="row">
          <div className="about mt-5 col-md-6">
            <h2 className="text-decoration-underline text-light ">About Us</h2>
            <p className="text-light  size-20 ">
              At GetDone, we believe in the power of talent and collaboration.
              Our mission is to empower freelancers and businesses by providing
              a seamless platform to connect, communicate, and succeed together.
              Whether you're a freelancer looking for projects or a client in
              search of top-notch talent, we've got you covered.
            </p>
            <h3 className="text-light">How it works:</h3>
            <ul className="text-light">
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

          <img src={img} className="about-img col-md-5 float-end" alt="" />
        </div>
      </footer>
    </div>
  );
}

export default Home;
