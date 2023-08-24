import React, { useContext, useEffect, useState } from "react";
import NavBar2 from "../Component/NavBar2";
import { useNavigate } from "react-router-dom";
import instance from "../axios/axios";
import cookies from "js-cookies";
import CardDashboard from "../Component/CardDashboard";
import { userData } from "../configs/userData";

function DashBoard() {
  const [showPosts, setPosts] = useState([]);
  const [search, setSearch] = useState([]);
  const navigate = useNavigate();
  const val = useContext(userData);
  const loadPosts = () => {
    instance
      .get("/getSavedPosts", {
        params: {
          saved: JSON.parse(localStorage.getItem("saved")),
        
        },
      })
      .catch((err) => {
        console.log(err)
      })
      .then((res) => {
        console.log(res?.data);
        setPosts(res?.data?.data);
        setSearch(res?.data?.data);
      });
  };

  const types = [
    "Web Development",
    "UI/UX Design",
    "Civil Engineer",
    "Graphic Designer",
    "App Development",
    "Game Development",
    "Cybersecurity",
    "DevOps",
    "Data Science",
    "Digital Marketing",
    "Content Writing",
    "Mobile Development",
    "Cloud Computing",
    "Machine Learning",
    "Network Engineering",
    "Software Testing",
    "Blockchain Development",
    "Social Media Management",
    "Video Editing",
    "IT Support",
    "Copywriting",
    "E-commerce Development",
    "Motion Graphics",
    "Database Administration",
    "SEO Specialist",
    "AR/VR Development",
    "Product Design",
    "Network Security",
    "Illustration",
  ];

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    // console.log(scrollTop+clientHeight,scrollHeight);
    if (scrollTop + clientHeight >= scrollHeight - 1) {
      loadPosts();
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="height-100vh-min ">
      <div>
        <NavBar2 />
        <div className="flex flex-col p-3">
          <div className="flex w-2/4 float-right flex-wrap justify-between">
            <input
              type="text"
              className="p-4 pl-10 text-sm h-40px text-gray-900 border border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 "
              placeholder="search"
              onChange={(e) =>
                setSearch(
                  showPosts?.filter((x) => {
                    return x?.head
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase());
                  })
                )
              }
            />
            <div className="flex">
              <label htmlFor="option">Type: </label>
              <select
                id="option"
                onChange={(e) => {
                  setSearch(
                    showPosts?.filter((x) => {
                      return x?.type
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase());
                    })
                  );
                }}
                className="border w-45  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" className="text-black">
                  Select an option
                </option>
                {types.map((x) => (
                  <option value={x} className="text-black">
                    {x}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="card-grid">
            {search?.map((x) => (
              <div className="flex flex-col">
                <CardDashboard gig={x} view={true} />
                <button
                  type="button"
                  class="focus:outline-none mt-4 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  onClick={() => {
                    let a = JSON.parse( localStorage.getItem("saved")) || []
                  if(a){
                    console.log(a,x?.posts._id)
                    if (a.some(item => item === x?.posts?._id)) {
                        const indexToRemove = a.indexOf(x?.posts._id);
                        if (indexToRemove !== -1) {
                          a.splice(indexToRemove, 1);
                        }
                    } 
                  }
                  console.log(a)
                  localStorage.setItem("saved", JSON.stringify(a))
                  loadPosts();
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
