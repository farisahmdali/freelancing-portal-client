import React, { useContext, useState } from "react";
import { Select, Input } from "antd";
import profilePic from "../asset/user.png";
import instance from "../axios/axios";
import Loading from "../Loading";
import cookies from "js-cookies";
import { userData } from "../configs/userData";

const Option = Select;
const DeveloperForm = ({ user, close }) => {
  const [name, setName] = useState(user?.name);
  const [phoneNumber, setPhoneNumber] = useState({
    send: user?.phone,
    confirm: user?.phone,
  });
  const [developerType, setDeveloperType] = useState(user?.workAs);
  const [img, setImg] = useState(user?.pic);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState({ got: "", entered: "" });
 const val = useContext(userData)
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber({ ...phoneNumber, send: e.target.value });
  };

  const handleDeveloperTypeChange = (e) => {
    setDeveloperType(e);
  };

  const handleOtp = (e) => {
    setOtp({ ...otp, entered: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    instance.post("/updateUser", {
      token: cookies.getItem("token"),
      data: {
        pic:img,
        name,
        phone: phoneNumber.confirm,
        workAs: developerType,
      },
    }).then(()=>{
        instance.post('/login',{
            token:cookies.getItem('token')
        }).then(res=>val.setUser(res.data.userDetail))
    })
    close(false);
  };

  return (
    <div
      className="form-container position-fixed height-100vh w-100"
      style={{ background: "black", color: "white" }}
    >
      {loading ? <Loading /> : null}
      <button
        className="btn-close btn-close-white"
        onClick={() => close(false)}
      ></button>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="col-12 p-5 col-sm-5 col-md-3"
      >
        <h2>Edit</h2>
        <div>
          <label htmlFor="dp">
            <img
              src={img || profilePic}
              height={80}
              width={80}
              className="bg-white mt-2"
              style={{ borderRadius: "100%" }}
              alt=""
              srcset=""
            />
            <input
              type="file"
              name=""
              id="dp"
              className="d-none"
              onChange={(e) => {
                setLoading(true);
                let formData = new FormData();

                formData.append("file", e.target.files[0]);

                instance.post("/imageUpload", formData).then((res) => {
                  setImg(res.data.url);
                  setLoading(false);
                });
              }}
            />
          </label>
        </div>

        <div className="mt-2">
          <label htmlFor="name">Name:</label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="mt-2">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <Input
            type="number"
            id="phoneNumber"
            value={phoneNumber.send}
            onChange={handlePhoneNumberChange}
            required
          />
          {user?.phone !== phoneNumber?.send ? (
            <button
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault();
                instance
                  .post("/otp", { phone: phoneNumber.send })
                  .then((res) => {
                    console.log(res.data.otp);
                    setOtp({ ...otp, got: res.data.otp });
                  });
              }}
            >
              send otp
            </button>
          ) : null}
        </div>
        {user?.phone !== phoneNumber?.send ? (
          <div className="mt-2">
            <label htmlFor="otp">otp:</label>
            <Input type="number" id="phoneNumber" onChange={handleOtp} />
            <button
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault();
                if (otp.got === parseInt(otp.entered)) {
                  user.phone = phoneNumber.send;
                  setPhoneNumber({ ...phoneNumber, confirm: phoneNumber.send });
                } else {
                  window.alert("otp is not correct");
                  setPhoneNumber();
                  setOtp();
                }
              }}
            >
              confirm
            </button>
          </div>
        ) : null}
        <div className="mt-2">
          <label htmlFor="developerType">Developer Type:</label>
          <Select
            id="developerType"
            value={developerType}
            onChange={handleDeveloperTypeChange}
            required
          >
            <Option value="Frontend">Frontend Developer</Option>
            <Option value="Backend">Backend Developer</Option>
            <Option value="Fullstack">Fullstack Developer</Option>
          </Select>
        </div>
        <button type="submit" className="btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default DeveloperForm;
