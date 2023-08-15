import React, { useContext, useEffect, useState } from "react";
import instance from "../../axios/axios";
import cookies from "js-cookies";
import { useNavigate, useParams } from "react-router-dom";
import { userData } from "../../configs/userData";
import Card from "../../Component/Card";
import ConfirmPayment from "../../Component/ConfirmPayment";

function ViewPost() {
  const { postId, userId } = useParams();
  const [data, setData] = useState();
  const [confirm, setConfirm] = useState(false);
  const [bargin, setBargin] = useState();
  const [barginDes, setBarginDes] = useState();
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [state,setState]=useState(false);
  const val = useContext(userData);
  const navigate = useNavigate();

  const dataFetch = () => {
    console.log(postId, userId,val.user._id);
    instance
      .get("/PostDataBrowse", {
        params: {
          token: cookies.getItem("token"),
          id: postId,
          userId,
        },
      })
      .then((res) => {
        setData(res.data.post);
        setBargin(res.data.post.price);
        console.log(res.data.post);
        try{
          if(res.data.post?.approvedTo[0]){
            setState(true)
          }else{
            setState(false)
          }
        }catch(err){
          setState(false)
          console.log(err);
        }
      })
      .catch((err) => {
         console.log(err);
      });
  };

  useEffect(() => {
    dataFetch();
  }, [postId, userId]);
  return (
    <div className="text-black view height-100vh-min">
      {confirmPayment ? <ConfirmPayment paid={data?.paid || false} username={data?.approvedTo[0]?.username} postId={postId} amount={data?.price} userId={data?.approvedTo[0]?._id} close={setConfirmPayment}/> :null}
      {confirm ? (
        <div className="confirmation-box z-3">
          <button className="btn-close" onClick={() => setConfirm(false)}>
            X
          </button>{" "}
          <br />
          <label htmlFor="heading">Your Offer</label>
          <input
            type="text"
            id="heading"
            value={bargin}
            onChange={(e) => setBargin(e.target.value)}
            required
            style={{
              background: "transparent",
              color: "black",
              border: "none",
              borderBottom: "1px solid black",
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
            }}
          />
          <label htmlFor="description" style={{ display: "block" }}>
            Description:
          </label>
          <textarea
            id="description"
            onChange={(e) => setBarginDes(e.target.value)}
            value={barginDes}
            style={{
              background: "transparent",
              color: "black",
              border: "none",
              borderBottom: "1px solid black",
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              resize: "vertical",
            }}
          ></textarea>
          <button
            className="btn border-black float-end "
            onClick={() => {
              instance
                .post("/requestToAPost", {
                  token: cookies.getItem("token"),
                  userId,
                  postId,
                  bargin,
                  barginDes,
                  username: val.user.username,
                })
                .then(() => {
                  navigate("/dashBoard");
                })
                .catch(() => navigate("/"));
            }}
          >
            send
          </button>
        </div>
      ) : null}
      <button
        className="btn"
        onClick={() => {
          window.history.back();
        }}
      >
        {"<-"}
      </button>
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
              src={data?.pic}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {data?.head}
              </h1>

              <p className="leading-relaxed">{data?.description}.</p>
{userId !== val.user._id ? 
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ${data?.price}
                </span>
                <button
                  onClick={() => {
                    setConfirm(true);
                  }}
                  className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                >
                  Request
                </button>
                <button
                  className="rounded-full focus:text-red-500 w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4 "
                  onClick={() => {
                    let a = JSON.parse(localStorage.getItem("saved")) || [];
                    if (a) {
                      console.log(a);
                      if (a.some((item) => item === postId)) {
                        console.log("Value is present in the array.");
                      } else {
                        a.push(postId);
                      }
                    } else {
                      a = [postId];
                    }
                    localStorage.setItem("saved", JSON.stringify(a));
                  }}
                >
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                </button>
              </div>:null}
            </div>
          </div>
        </div>
      </section>
      {userId !== val.user._id ? (
        <h2 className="text-decoration-underline">User</h2>
      ) : null}
      {userId !== val.user._id ? (
        <div className="border-box" onClick={() => navigate("/user/" + userId)}>
          <img
            src={data?.user.pic}
            height={150}
            className="dp"
            alt=""
            srcset=""
          />
          <h5>
            <span>Username</span> : {data?.user?.username}
          </h5>
          <h5>
            <span>Name </span> : {data?.user?.name}
          </h5>
          <h5>
            <span>Rating</span> : {data?.user?.rating || "no rating yet"}
          </h5>
          <h5>
            <span>Occupation </span> : {data?.user?.workAs || "nill"}
          </h5>
        </div>
      ) : null}
      {userId === val.user._id && state ? (
        <div className="p-5">
          <h1
            className="cursor-point"
            onClick={() => navigate("/user/" + data?.approvedTo?.[0]?._id)}
          >
            Username : {data?.approvedTo[0]?.username}
          </h1>
          <br />
          <progress
            value={data?.updation?.completed}
            max={100}
            className="custom-progress"
          />
          {data?.updation?.completed == 100 && userId === val.user._id ? (
            <>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setConfirmPayment(true)}
              >
                Pay and Dowload
              </button>
            </>
          ) : null}
        </div>
      ) : (
        <div className="border-box">
          {userId === val.user._id ? data?.requests?.map((x) => (
            <Card
              description={x?.desOfOffered}
              price={x?.offered}
              heading={x?.username}
              usersId={x?._id}
              postId={postId}
              onClick={() => navigate("/user/" + x?._id)}
            />
          )) : null}
        </div>
      )}
    </div>
  );
}

export default ViewPost;
