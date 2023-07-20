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
    <div className="admin_panel text-white container">
      <div className="row">
        <div>
          <button
            className="btn btn-danger"
            onClick={() => {
              val.setUser();
              navigate("/", { replace: true });
            }}
          >
            logout
          </button>
        </div>
        <div className="p-3">
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
                users?.filter((x) => {
                  return x?.username
                    .toLowerCase()
                    .startsWith(e.target.value.toLowerCase());
                })
              )
            }
          />
        </div>
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Phone</th>
              <th scope="col">Role</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {search?.map((x, index) => (
              <tr className={x?.blocked ? "blocked" : null}>
                <th scope="row">{index + 1}</th>
                <td>{x.name}</td>
                <td>{x.username}</td>
                <td>{x?.phone || "nill"}</td>
                <td>{x?.workAs || "nill"}</td>
                <td
                  className="text-danger cursor-point text-decoration-underline"
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
