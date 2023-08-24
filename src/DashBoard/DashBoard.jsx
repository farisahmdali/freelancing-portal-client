import React, { useContext, useEffect, useState } from "react";
import NavBar2 from "../Component/NavBar2";
import { useNavigate } from "react-router-dom";
import instance from "../axios/axios";
import cookies from "js-cookies";
import CardDashboard from "../Component/CardDashboard";
import { userData } from "../configs/userData";
import Loading from "../Loading";

function DashBoard() {
  const [showPosts, setPosts] = useState([]);
  const [search, setSearch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValues, setSearchValues] = useState({ select: "", input: "" });
  const navigate = useNavigate();
  const val = useContext(userData);
  const loadPosts = () => {
    instance
      .get("/getPosts", {
        params: {
          token: cookies.getItem("token"),
          applied: val.user.requestsSended,
        },
      })
      .catch(() => {
        cookies.removeItem("token");
        navigate("/login", { replace: true });
      })
      .then((res) => {
        setPosts((showPosts) => [
          ...showPosts,
          ...res.data.result.filter((x) => {
            if (!showPosts.find((y) => y._id === x._id)) {
              return x;
            }
          }),
        ]);
        setSearch((showPosts) => [
          ...showPosts,
          ...res.data.result.filter((x) => {
            if (!showPosts.find((y) => y._id === x._id)) {
              return x;
            }
          }),
        ]);
        setLoading(false);
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
      {loading ? <Loading /> : null}
      <div>
        <NavBar2 />
        <div className="flex flex-col ps-3 pe-3 pb-3">
          <div className="w-full flex flex-wrap ">
            <label
              htmlFor="default-search"
              className="mb-2 mt-3 text-sm font-medium text-gray-900 sr-only "
            >
              Search
            </label>
            <div className="relative mt-3">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Search Mockups, Logos..."
                onChange={(e) => {
                  setSearchValues({
                    ...searchValues,
                    input: e.target.value.toLowerCase(),
                  });
                  setSearch(
                    showPosts?.filter((x) => {
                      return (
                        x?.head
                          .toLowerCase()
                          .includes(e.target.value.toLowerCase()) &&
                        x?.type.toLowerCase().includes(searchValues.select)
                      );
                    })
                  );
                }}
              />
            </div>

            <div className="flex justify-center items-center p-3 felx-col ">
              <select
                id="option"
                onChange={(e) => {
                  setSearchValues({
                    ...searchValues,
                    input: e.target.value.toLowerCase(),
                  });
                  setSearch(
                    showPosts?.filter((x) => {
                      return (
                        x?.head
                          .toLowerCase()
                          .includes(e.target.value.toLowerCase()) &&
                        x?.type.toLowerCase().includes(searchValues.select)
                      );
                    })
                  );
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="" className="text-black">
                  Select an Category
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
              <CardDashboard gig={x} view={true} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
