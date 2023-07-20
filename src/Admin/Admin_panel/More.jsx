import React, { useContext, useEffect, useState } from "react";
import { userData } from "../../configs/userData";
import Loading from "../../Loading";
import instance from "../../axios/axios";
import cookies from "js-cookies";
import Card from "../../Component/Card1";
import EditPosts from "../../MyPosts/EditPost/EditPosts";
import { useNavigate } from "react-router-dom";

function More(props) {
  const val = useContext(userData);
  const [user, setUser] = useState(val.user);
  const [edit, setEdit] = useState("");
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState();
  const navigate = useNavigate();
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

  const handleUpdate = () => {
    setLoading(true);
    instance
      .post("/admin/updateUser", {
        token: cookies.getItem("token"),
        userId: user._id,
        data: user,
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        cookies.removeItem("token");
        navigate("/", { replace: true });
      });
  };

  const handleDelete=()=>{
    let confirm = window.confirm("do you want to delete")
    if(confirm){
    instance.post("/admin/delete",{
      token:cookies.getItem("token"),
      _id:user._id
    }).then(()=>{
      navigate("/admin_panel",{replace:true})
    }).catch(() => {
      cookies.removeItem("token");
      navigate("/", { replace: true });
    });
  }
  }

  const handleBlock=()=>{
    let confirm = window.confirm("do you want to proceed")
    if(confirm){
    instance.post("/admin/block",{
      token:cookies.getItem("token"),
      _id:user._id,
      event:user?.blocked ? false : true
    }).then(()=>{
      navigate("/admin_panel",{replace:true})
    }).catch(() => {
      cookies.removeItem("token");
      navigate("/", { replace: true });
    });
  }
  }

  useEffect(() => {
    instance
      .get("/admin/userPosts", {
        params: {
          token: cookies.getItem("token"),
          id: user._id,
        },
      })
      .then((res) => setPosts(res.data.result))
      .catch(() => {
        cookies.removeItem("token");
        navigate("/", { replace: true });
      });
  }, [user._id, loading, editPost]);

  return (
    <div className="container-fluid height-100vh-min text-light">
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
              .post("/admin/editPost", {
                token: cookies.getItem("token"),
                data,
                userId: user._id,
                id: editPost._id,
              })
              .then(() => {
                setLoading(false);
                setEditPost();
              })
              .catch(() => {
                cookies.removeItem("token");
                navigate("/", { replace: true });
              });
          }}
        />
      ) : (
        <div className="row pt-5">
          <div className="d-flex flex-wrap justify-content-between">
            <div className="d-flex flex-wrap">
              <label htmlFor="file">
                <img src={user.pic} alt="" height={200} className="imgAdmin" />
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
              <div className="d-flex ms-sm-5 flex-column justify-content-between">
                <div>
              
                    <h2>
                      Username : {user.username}
                    </h2>
                  
                  {edit === "name" ? (
                    <input
                      type="text"
                      style={{
                        background: "transparent",
                        color: "white",
                        border: "none",
                        borderBottom: "1px solid white",
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
                  {edit === "phone" ? (
                    <input
                      type="number"
                      style={{
                        background: "transparent",
                        color: "white",
                        border: "none",
                        borderBottom: "1px solid white",
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
                        color: "white",
                        border: "none",
                        borderBottom: "1px solid white",
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
                </div>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                  <button className="btn-primary" onClick={handleUpdate}>
                    Update
                  </button>
                  <button className="btn btn-danger" onClick={handleBlock}>{user?.blocked ? "Unblock" : "Block"}</button>
                </div>
              </div>
            </div>
            <div className="cards col-md-6 col-12 bg-black border-light p-1">
              <h4 className="text-decoration-underline">Reports</h4>
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
                        .post("/admin/deletePost", {
                          token: cookies.getItem("token"),
                          userId: user._id,
                          id: x._id,
                        })
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
  );
}

export default More;
