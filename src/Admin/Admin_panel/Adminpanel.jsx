import React, { useContext, useEffect, useState } from "react";
import "./admin.css";
import cookies from "js-cookies";
import { userData } from "../../configs/userData";
import { useNavigate } from "react-router-dom";
import instance from "../../axios/axios";

function Admin_panel() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState([]);
  const val = useContext(userData);
  useEffect(() => {
    instance
      .get("/admin/user", {
        params: {
          token: cookies.getItem("token"),
        },
      })
      .then((res) => {
        setUsers(res.data.result);
        setSearch(res.data.result);
        console.log(res.data.result);
      });
  }, []);

  return (
    <div className="admin_panel t container">
      <div className="row">
        <div>
          <button
            className="bg-red-500 p-2 rounded  hover:bg-red-600 hover:text-white"
            onClick={() => {
              val.setUser();
              navigate("/", { replace: true });
            }}
          >
            logout
          </button>
        </div>
        <div className="relative overflow-x-auto">
          <input
            type="text"
            style={{
              background: "transparent",
              color: "black",
              border: "none",
              borderBottom: "1px solid black",
              padding: "8px",
              borderRadius: "4px",
            }}
            placeholder="search"
            onChange={(e) =>
              setSearch(
                users?.filter((x) => {
                  return x?.username
                    .toLowerCase()
                    .startsWith(e.target.value.toLowerCase());
                })
              )
            }
          />
        </div>
        <table className="w-full text-sm mt-5 text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">#</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Username</th>
              <th scope="col" className="px-6 py-3">Phone</th>
              <th scope="col" className="px-6 py-3">Role</th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {search?.map((x, index) => (
              <tr className={x?.blocked ? "blocked" : "bg-white border-b dark:bg-gray-800 dark:border-gray-700"}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</th>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{x.name}</td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{x.username}</td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{x?.phone || "nill"}</td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{x?.workAs || "nill"}</td>
                <td
                  className="px-2 py-2 cursor-point text-red-500 underline whitespace-nowrap "
                  onClick={() => {
                    console.log(x);
                    val.setUser(x);
                    navigate(`/admin_panel/more`);
                  }}
                >
                  more
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin_panel;
