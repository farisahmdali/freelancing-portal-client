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
  const [loading,setLoading]=useState(false)

  const navigate = useNavigate();
  useEffect(() => {
    instance
      .get("/Posts", {
        params: {
          token: cookies.getItem("token"),
        },
      })
      .then((res) => {
        setSearch(res.data.result);
        setPosts(res.data.result);
      });
  }, [edit,loading]);
  return (
    <div className="height-100vh-min">
      {loading ? <Loading/>:null}
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
        />
      ) : (
        <div>
          <NavBar2 />
          <div className="d-flex flex-column">
            <div className="p-2 w-100">
              <button
                className="btn-primary float-end"
                onClick={() => {
                  navigate("/createPost");
                }}
              >
                Create post
              </button>
            </div>
            <div className="p-5">
              <input
                type="text"
                placeholder="search"
                style={{
                  background: "transparent",
                  color: "white",
                  border: "none",
                  borderBottom: "1px solid white",
                  padding: "8px",
                  borderRadius: "4px",
                }}
                onChange={(e) =>
                  setSearch(
                    posts?.filter((x) => {
                      return x?.head
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase());
                    })
                  )
                }
              />
            </div>
            <div className="card-grid">
              {search?.map((x) => (
                <Card1
                  description={x.description}
                  className="mt-3"
                  heading={x.head}
                  imageSrc={x.pic}
                  edit={setEdit}
                  fullData={x}
                  deletePost={()=>{
                    let confirm = window.confirm("do you want to delete")
                    if(confirm){
                      setLoading(true)
                      instance.post("/deletePost",{
                        token:cookies.getItem("token"),
                        id:x._id
                      }).then(()=>setLoading(false))
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
