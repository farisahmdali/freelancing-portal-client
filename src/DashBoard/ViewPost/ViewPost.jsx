import React, { useEffect, useState } from "react";
import instance from "../../axios/axios";
import cookies from "js-cookies";
import { useParams } from "react-router-dom";

function ViewPost() {
  const { postId, userId } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
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
      });
  }, [postId,userId]);

  console.log(data);
  return (
    <div className="text-black view height-100vh-min">
      <button
        className="btn text-light"
        onClick={() => {
          window.history.back();
        }}
      >
        {"<-"}
      </button>
      <div className="container bg-grey pt-5">
        <div className="row">
          <div className="d-flex flex-column col-12 col-sm-5">
            <img src={data?.pic} alt="" srcset="" />
            <div className="d-flex justify-content-between p-2">
              <button className="btn-fav">Save to later</button>
              <button className="btn-primary">request</button>
            </div>
          </div>
          <div className="col-12 col-sm-6 float-end d-flex flex-column justify-content-center">
            <h2 className="text-decoration-underline">User</h2>
            <div className="border-box">
            <img src={data?.user.pic} height={150} className="dp float-md-end" alt="" srcset="" />
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
            <h2 className="text-decoration-underline">{data?.head}</h2>
            <p >{data?.description}</p>
            {data?.links[0] ? (
              <h4 className="text-decoration-underline mt-3">Links</h4>
            ) : null}
            <ul>
              {data?.links?.map((x) => (
                <li>
                  {" "}
                  <a href={`https://${x?.url}`} className="link">
                    {x?.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-end">
              <h3 className="fw-bolder">Offered : &#x20B9;{data?.price}</h3>
            </div>
          </div>
          
          <div className="col-md-6 col-12 text-aware">
            <h6>Please aware</h6>
            <ul>
                <li>Users Please not to share sensitive information, such as passwords, social security numbers, or financial details, with anyone .</li>
                <li>We are not responsible if you share sensitive information  with anyone</li>
                <li>For secure payment do payments through this plateform</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPost;
