import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import cookies from "js-cookies";
import instance from "../axios/axios";
import CardDashboard from "../Component/CardDashboard";
import Report from "../Component/Report";
import { Rate } from "antd";
import Rating from "../Component/Rating";
import NavBar2 from "../Component/NavBar2";
import Loading from "../Loading";

function ViewProfiles() {
  const [user, setUser] = useState();
  const { userId } = useParams();
  const [report, setReport] = useState(false);
  const [rate, setRate] = useState(false);
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    instance
      .get("/userDetails", {
        params: {
          userId,
        },
      })
      .then((res) => {
        setUser(res.data.user);
        console.log(res.data.user);
        setLoading(false)
      });
  }, []);
  return (
    <>
    {loading ? <Loading/>:null}
        <NavBar2/>
      <div className="p-16">
        {report ? <Report userId={userId} close={setReport} /> : null}
        {rate ? <Rating userId={userId} close={setRate} /> : null}
        <div className="p-8 bg-white shadow mt-24">
          {" "}
          <div className="grid grid-cols-1 md:grid-cols-3">
            {" "}
            <div className=" w-full text-center order-last md:order-first mt-20 md:mt-0 flex justify-between">
              {" "}
              <div>
                {" "}
                <div className="flex items-center">
                 
                  <p className="bg-blue-100 text-blue-800 text-sm font-semibold inline-flex items-center p-1.5 rounded dark:bg-blue-200 dark:text-blue-800 ">
                  <svg
                    className="w-4 h-4 text-yellow-300 mr-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  {user?.rate ? Math.round((user?.rate.val/user?.rate.count)*10)/10 : "nill"}
                  </p>
                  
                </div>
                <p className="font-bold text-gray-700 text-xl">
                  {user?.posts[0]?.posts?.length || 0}
                </p>{" "}
                <p className="text-gray-400">Posts</p>{" "}
              </div>{" "}
              <div>
              <button
                className="text-white py-2 px-4 uppercase rounded bg-red-400 hover:bg-red-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                onClick={() => {
                  setReport(true);
                }}
              >
                {" "}
                Report
              </button>{" "}
              </div>
              <div>
              <button
                className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={() => {
                  setRate(true);
                }}
              >
                {" "}
                Rate
              </button>
              </div>
            </div>{" "}
            <div className="relative">
              {" "}
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500 z-0">
                <img
                  src={user?.pic}
                  alt="profile Image"
                  className="rounded-full"
                />
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="mt-20 text-center border-b pb-12">
            {" "}
            <h1 className="text-4xl font-medium text-gray-700">
              {user?.username}
            </h1>{" "}
            <p className="font-light text-gray-600 mt-3">{user?.name}</p>{" "}
            <p className="mt-8 text-gray-500">{user?.workAs}</p>{" "}
          </div>{" "}
        </div>
      </div>
      <div className="p-5">
        <h4 className="text-decoration-underline">Posts</h4>
        <div className="card-grid">
          {user?.posts[0]?.posts?.map((x) => (
            <CardDashboard gig={{ ...x, userId: user?._id }} view={true}/>
          ))}
        </div>
      </div>
    </>
  );
}

export default ViewProfiles;
