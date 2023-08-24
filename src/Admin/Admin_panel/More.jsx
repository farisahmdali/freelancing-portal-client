import React, { useContext, useEffect, useState } from "react";
import { userData } from "../../configs/userData";
import Loading from "../../Loading";
import instance from "../../axios/axios";
import cookies from "js-cookies";
import Card from "../../Component/Card1";
import EditPosts from "../../MyPosts/EditPost/EditPosts";
import { useNavigate } from "react-router-dom";
import ConfirmBox from "../../Component/ConfirmBox";

function More(props) {
  const val = useContext(userData);
  const [confirm,setConfirm] = useState(false);
  const [user, setUser] = useState(val.user);
  const [report,setReport]=useState([])
  const [edit, setEdit] = useState("");
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState();
  const navigate = useNavigate();
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

  const handleUpdate = () => {
    setLoading(true);
    instance
      .post("/admin/updateUser", {
        userId: user._id,
        data: user,
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        cookies.removeItem("token");
        setConfirm(true)

      });
  };

  const handleDelete = () => {
    let confirm = window.confirm("do you want to delete");
    if (confirm) {
      instance
        .post("/admin/delete", {
          _id: user._id,
        })
        .then(() => {
          navigate("/admin_panel", { replace: true });
        })
        .catch(() => {
          cookies.removeItem("token");
          setConfirm(true)
        });
    }
  };

  const handleBlock = () => {
    let confirm = window.confirm("do you want to proceed");
    if (confirm) {
      instance
        .post("/admin/block", {
          _id: user._id,
          event: user?.blocked ? false : true,
        })
        .then(() => {
          navigate("/admin_panel", { replace: true });
        })
        .catch(() => {
          cookies.removeItem("token");
          setConfirm(true)

        });
    }
  };

  useEffect(() => {
    instance
      .get("/admin/userPosts", {
        params: {
          id: user._id,
        },
      })
      .then((res) => {
        setPosts(res.data.result);
        setReport(res?.data?.reports)
      })
      .catch(() => {
        cookies.removeItem("token");
        setConfirm(true)

      });
  }, [user._id, loading, editPost]);

  return (
    <>
      {confirm ? <ConfirmBox/>:null}
    <div className="container-fluid m-5 height-100vh-min">
      {loading ? <Loading /> : null}
      {editPost ? (
        <EditPosts
          Urls={editPost.links}
          amount={editPost.price}
          _id={editPost._id}
          close={setEditPost}
          descrip={editPost.description}
          head={editPost.head}
          pic={editPost.pic}
          select={editPost.type}
          CustomHandle={(data) => {
            setLoading(true);
            instance
              .patch("/admin/editPost/" + editPost._id, {
                data,
                userId: user._id,
              })
              .then(() => {
                setLoading(false);
                setEditPost();
              })
              .catch(() => {
                cookies.removeItem("token");
                setConfirm(true)

              });
          }}
        />
      ) : (
        <div className=" pt-5">
          <div className="flex flex-wrap sm:flex-col xs:flex-col justify-between">
            <div className="flex border">
              <label htmlFor="file" className="flex justify-center w-1/3">
                <img src={user.pic} alt=""  className="imgAdmin" />
                <input
                  type="file"
                  style={{ display: "none" }}
                  placeholder="Upload CV"
                  name="file"
                  onChange={async (e) => {
                    setLoading(true);
                    let file = e.target.files[0];
                    const formData = new FormData();
                    file = new File([file], user?._id + ".jpg");
                    console.log(file);
                    formData.append("file", file);
                    instance
                      .post("/imageUpload", formData)
                      .then((res) => {
                        setUser({ ...user, pic: res.data.url });
                        setLoading(false);
                      })
                      .catch((res) => console.log(res));
                  }}
                  className="up-cv1"
                  id="file"
                />
              </label>
              <div className="flex self-center p-5">
                <div>
                  <h2>Username : {user.username}</h2>
                  {edit === "name" ? (
                    <input
                      type="text"
                      style={{
                        background: "transparent",
                        color: "black",
                        border: "none",
                        borderBottom: "1px solid black",
                        width: "100%",
                        padding: "8px",
                        borderRadius: "4px",
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          setEdit();
                        }
                      }}
                      value={user.name}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                    />
                  ) : (
                    <h2 onClick={() => setEdit("name")}>Name : {user.name}</h2>
                  )}{" "}
                  {/* </div>
                  <div className="ms-5"> */}
                  {edit === "phone" ? (
                    <input
                      type="number"
                      style={{
                        background: "transparent",
                        color: "black",
                        border: "none",
                        borderBottom: "1px solid black",
                        width: "100%",
                        padding: "8px",
                        borderRadius: "4px",
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          setEdit();
                        }
                      }}
                      value={user.phone}
                      onChange={(e) =>
                        setUser({ ...user, phone: e.target.value })
                      }
                    />
                  ) : (
                    <h2 onClick={() => setEdit("phone")}>
                      Phone : {user.phone || "nill"}
                    </h2>
                  )}{" "}
                  {edit === "role" ? (
                    <select
                      id="option"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          setEdit();
                        }
                      }}
                      value={user.workAs}
                      onChange={(e) =>
                        setUser({ ...user, workAs: e.target.value })
                      }
                      style={{
                        background: "transparent",
                        color: "black",
                        border: "none",
                        borderBottom: "1px solid black",
                        width: "100%",
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
                  ) : (
                    <h2 onClick={() => setEdit("role")}>
                      Role : {user.workAs || "nill"}
                    </h2>
                  )}
                  <div className="flex justify-between mt-3">
                    <button
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                    <button
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      onClick={handleUpdate}
                    >
                      Update
                    </button>
                    <button
                      className="focus:outline-none text-white bg-red-700  hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      onClick={handleBlock}
                    >
                      {user?.blocked ? "Unblock" : "Block"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-solid h-[30vh] overflow-y-auto sm:mt-3 xs:mt-3">
              <h4 className="underline">Reports</h4>
              <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                {report?.map(x=>(
                  <li className="ms-3">{x?.msg+`(${x?.time}/user:-${x?.user})`}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-5">
            <h4 className="text-decoration-underline">Posts</h4>
            <div className="card-grid">
              {posts?.map((x) => (
                <Card
                  description={x.description}
                  className="mt-3"
                  heading={x.head}
                  imageSrc={x.pic}
                  edit={setEditPost}
                  fullData={x}
                  deletePost={() => {
                    let confirm = window.confirm("Do you want to delete");
                    if (confirm) {
                      setLoading(true);
                      instance
                        .delete("/admin/deletePost/" + user._id + "/" + x._id)
                        .then(() => setLoading(false))
                        .catch((err) => {
                          console.log(err);
                          setLoading(false);
                          cookies.removeItem("token");
                        });
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default More;
