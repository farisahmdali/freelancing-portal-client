import React, { useEffect, useState } from "react";
import NavBar2 from "../Component/NavBar2";
import { useNavigate } from "react-router-dom";
import instance from "../axios/axios";
import cookies from "js-cookies";
import CardDashboard from "../Component/CardDashboard";

function DashBoard({ className }) {
  const [showPosts, setPosts] = useState([]);
  const [search, setSearch] = useState([]);
  const navigate = useNavigate();
  const loadPosts = () => {
    instance
      .get("/getPosts", {
        params: {
          token: cookies.getItem("token"),
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
      });
  };

  const types = [
    "Web development",
    "Ui/Ux design",
    "Civil Engineeer",
    "Graphic Designer",
    "App Development",
    "Game development",
    "Cyber Security",
    "DevOps",
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
  },[]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="height-100vh-min">
      <div>
        <NavBar2 />
        <div className="d-flex flex-column">
          <div className="d-flex p-5 w-50 justify-content-between">
            <input
              type="text"
              style={{
                background: "transparent",
                color: "white",
                border: "none",
                borderBottom: "1px solid white",
                padding: "8px",
                borderRadius: "4px",
              }}
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
            <select
            id="option"
            onChange={(e)=>{
              setSearch(
                showPosts?.filter((x) => {
                  return x?.type
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase());
                })
              )
            }}
            style={{
              background: "transparent",
              color: "white",
              border: "none",
              borderBottom: "1px solid white",
              padding: "8px",
              borderRadius: "4px",
            }}
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
          <div className="card-grid">
            {search?.map((x) => (
              <CardDashboard gig={x} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
