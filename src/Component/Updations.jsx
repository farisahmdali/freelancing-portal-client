import React, { useEffect, useState } from "react";
import instance from "../axios/axios";
import cookies from "js-cookies";

function Updations({ close, data, user }) {
  const [slider, setSlider] = useState(0);
  const [progress, setProgress] = useState(0);
  const [description, setDescription] = useState(data?.updation?.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    instance
      .post("/postUpdationOfWork", {
        token: cookies.getItem("token"),
        postId: data._id,
        data: {
          completed: slider,
          description,
        },
      })
      .then(() => [close()]);
  };
  

  useEffect(() => {
    setSlider(parseInt(data?.updation?.completed) || 0);
  }, []);

  return (
    <div className="height-100vh-min w-100vh transition-1s  z-3 top-0">
      <button className="btn-close" onClick={() => close()}></button>
      <div className="container">
        <div>
          <div className="container pt-5">
            <div className="row">
              <div className="d-flex flex-column col-12 col-sm-5">
                <img src={data?.pic} alt="" srcset="" />
              </div>
              <div className="col-12 col-sm-6 float-end d-flex flex-column">
                <div className="border-box">
                  <img
                    src={user?.pic}
                    height={150}
                    className="dp float-md-end"
                    alt=""
                    srcset=""
                  />
                  <h5>
                    <span>Username</span> : {user?.username}
                  </h5>
                  <h5>
                    <span>Name </span> : {user?.name}
                  </h5>
                  <h5>
                    <span>Rating</span> : {user?.rating || "no rating yet"}
                  </h5>
                  <h5>
                    <span>Occupation </span> : {user?.workAs || "nill"}
                  </h5>
                </div>

                <h2 className="text-decoration-underline">{data?.head}</h2>
                <p>{data?.description}</p>
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
            </div>
          </div>
        </div>
        <form className="mt-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="slider">{slider}%</label>
            <br />
            <input
              type="range"
              name=""
              id="slider"
              value={slider}
              onChange={(e) => setSlider(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="des">Description</label> <br />
            <textarea
              name=""
              id=""
              cols="30"
              value={description}
              rows="10"
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{
                background: "transparent",
                color: " black",
                border: "1px solid  black",
                width: "50%",
                padding: "8px",
                borderRadius: "4px",
                resize: "vertical",
              }}
            ></textarea>
            <br />
            {slider == 100 ? (
              <div>
                <label htmlFor="">Only zip file can uploaded</label>
                <input
                  type="file"
                  className="m-3"
                  required
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    console.log(file.type);
                    const renamedFile = new File([file], `${user?._id}.zip`, {
                      type: file.type,
                    });
                    let formData = new FormData();
                    formData.append("file", renamedFile);
                    await instance.post("/postFiles", formData, {
                      onUploadProgress: (progressEvent) => {
                        const percentComplete =
                          (progressEvent.loaded / progressEvent.total) * 100;
                        setProgress(percentComplete);
                      },
                    });
                  }}
                />
              </div>
            ) : null}
            {progress > 0 && slider == 100 ? (
              <div class="progress mb-3">
                <div
                  class="progress-bar"
                  role="progressbar"
                  aria-valuenow={progress}
                  style={{ width: progress + "%" }}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            ) : null}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Updations;
