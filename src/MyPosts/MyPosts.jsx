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
        console.log(res.data);
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
          CustomHandle={(data)=>{
            instance
            .patch("/updatePost/"+edit._id, {
              token: cookies.getItem("token"),
              data,
            })
          }}
        />
      ) : (
        <div>
          <NavBar2 />
          <div className="d-flex flex-column">
            <div className="p-2 w-100">
              <button
                className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
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
                className="p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="search"
                
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
                      instance.delete("/deletePost/"+x._id,{
                        params:{
                          token:cookies.getItem("token"),
                        }
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
