import React, { useEffect, useState } from "react";
import instance from "../axios/axios";
import cookies from "js-cookies";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";

function Updations({ close, data, user }) {
  const [slider, setSlider] = useState(0);
  const [progress, setProgress] = useState(0);
  const [description, setDescription] = useState(data?.updation?.description);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
      {loading ? <Loading /> : null}
      <button className="bg-red-500 hover:bg-red-600 pt-2 pb-2 pe-3 ps-3 top-20 absolute left-5 rounded-full text-white" onClick={() => close()}>{"X"}</button>
      <div className="container">
        <section className="text-gray-700 body-font overflow-hidden bg-white">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="ecommerce"
                className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                src={data?.pic}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <div
                className="border-solid border-2 p-2 cursor-point"
                onClick={() => navigate("/user/" + user._id)}
              >
                <img
                  src={user?.pic}
                  height={150}
                  className="dp"
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
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {data?.head}
                </h1>

                <p className="leading-relaxed">{data?.description}.</p>

                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ${data?.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <form className="mt-5 p-5" onSubmit={handleSubmit}>
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
                    setLoading(true);
                    const file = e.target.files[0];
                    console.log(file.type);
                    const renamedFile = new File([file], `${data._id}.zip`, {
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
                    setLoading(false);
                  }}
                />
              </div>
            ) : null}
            {progress > 0 && slider == 100 ? (
              <div class="progress mb-3 w-full h-5">
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
