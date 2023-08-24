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
    instance.patch("/updateUser/", {
      data:{
        pic:img,
        name,
        phone: phoneNumber.confirm,
        workAs: developerType,
      }
     
    }).then(()=>{
        instance.post('/login').then(res=>val.setUser(res.data.userDetail))
    })
    close(false);
  };

  return (
    <div
      className="form-container position-fixed height-100vh w-100"
      style={{ background: "white", color: "black" }}
    >
      {loading ? <Loading /> : null}
      <button
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 "
        onClick={() => close(false)}
      >X</button>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="col-12 p-5 col-sm-6 col-md-3"
      >
        <h2 className="underline text-lg text-gray-900">Edit</h2>
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
              accept=".jpg, .jpeg, .png"
              name=""
              id="dp"
              className="hidden"
              onChange={(e) => {
                setLoading(true);
                const file = e.target.files[0]
                console.log(file.type)
                const renamedFile = new File([file], `${val.user._id}.jpg`, { type: file.type });
                let formData = new FormData();
                formData.append("file", renamedFile);

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
            style={{width:"200px"}}
          >
            {types.map(x=>(
              <Option value={x}>{x}</Option>

            ))}
           
          </Select>
        </div>
        <button type="submit" className="btn-primary text-black hover:text-white border-solid border mt-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default DeveloperForm;
