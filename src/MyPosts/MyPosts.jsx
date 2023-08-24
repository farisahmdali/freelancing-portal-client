import React, { useEffect, useState } from "react";
import Card1 from "../Component/Card1";
import NavBar2 from "../Component/NavBar2";
import { useNavigate } from "react-router-dom";
import instance from "../axios/axios";
import cookies from "js-cookies";
import EditPosts from "./EditPost/EditPosts";
import Loading from "../Loading";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState([]);
  const [edit, setEdit] = useState();
  const [loading, setLoading] = useState(false);
  const [searchValues, setSearchValues] = useState({ select: "", input: "" });
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

  const navigate = useNavigate();
  useEffect(() => {
    instance.get("/Posts").then((res) => {
      console.log(res.data);
      setSearch(res.data.result);
      setPosts(res.data.result);
    });
  }, [edit, loading]);
  return (
    <div className="height-100vh-min">
      {loading ? <Loading /> : null}
      {edit ? (
        <EditPosts
          close={setEdit}
          head={edit.head}
          descrip={edit.description}
          pic={edit.pic}
          Urls={edit.links}
          amount={edit.price}
          _id={edit._id}
          select={edit.type}
          CustomHandle={(data) => {
            instance
              .patch("/updatePost/" + edit._id, {
                data,
              })
              .catch((err) => {
                console.error(err);
              });
          }}
        />
      ) : (
        <div>
          <NavBar2 />
          <div className="ps-3 pe-3 pb-3">
            <div className="p-2 w-100 float-right">
              <button
                className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={() => {
                  navigate("/createPost");
                }}
              >
                Create post
              </button>
            </div>

            <div className=" flex flex-wrap ">
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
                      posts?.filter((x) => {
                        return (
                          x?.head
                            .toLowerCase()
                            .includes(e.target.value.toLowerCase()) &&
                          x?.type
                            .toLowerCase()
                            .includes(searchValues.select)
                        );
                      })
                    );
                  }}
                />
              </div>

              <div className="p-3">
                <select
                  id="option"
                  onChange={(e) => {
                    setSearchValues({
                      ...searchValues,
                      select: e.target.value.toLowerCase(),
                    });
                    setSearch(
                      posts?.filter((x) => {
                        return (
                          x?.type
                            .toLowerCase()
                            .includes(e.target.value.toLowerCase()) &&
                          x?.head
                            .toLowerCase()
                            .includes(searchValues.input)
                        );
                      })
                    );
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
            <div className="card-grid mt-5">
              {search?.map((x) => (
                <Card1
                  description={x.description}
                  className="mt-3"
                  heading={x.head}
                  imageSrc={x.pic}
                  edit={setEdit}
                  fullData={x}
                  deletePost={() => {
                    let confirm = window.confirm("do you want to delete");
                    if (confirm) {
                      setLoading(true);
                      instance
                        .delete("/deletePost/" + x._id)
                        .then(() => setLoading(false));
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPosts;
