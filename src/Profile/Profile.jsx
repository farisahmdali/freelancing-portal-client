import React, { useContext, useState } from "react";
import { userData } from "../configs/userData";
import NavBar2 from "../Component/NavBar2";
import editImg from "../asset/edit-solid.svg";
import DeveloperForm from "./Form";
import profilePic from "../asset/user.png";
import cookies from "js-cookies"
import { useNavigate } from "react-router-dom";


function Profile() {
  let val = useContext(userData);
  const [edit, setEdit] = useState("");
  const navigate=useNavigate()
  return (
    <div className="bg-black height-100vh-min ">
      <NavBar2 />
      <div className="container-fluid">
     <div className="d-flex flex-wrap justify-content-between">
      {edit ? <DeveloperForm close={setEdit} user={val.user} /> : 
      <div className="text-light cards p-5 col-12 col-sm-4 float-start">
        <img
        onClick={() => setEdit(true)}
        src={editImg}
        className="filter-invert ms-2 cursor-point float-end"
        height={20}
        alt=""
      />
      <div className="d-flex flex-column align-items-center">
      <img src={val.user.pic || profilePic} height={80} width={80} className="dp" alt="" srcset="" />
<div>
      <h4 className="mt-5">Name : {val.user.name}</h4>
      <h4>Username : {val.user.username}</h4>
      <h4>Phone : {val.user.phone || "nill"}</h4>
      <h4>Role : {val.user.workAs || "nill"}</h4>
      </div>
      <div className="w-100">
      <button className="btn btn-danger float-end" onClick={()=>{
        cookies.removeItem("token")
        val.setUser()
        navigate("/",{replace:true})
      }}>Log out</button>
      </div>
      </div>
        </div>}
        <div className="text-light cards col-12 float-end p-1  col-sm-4">
            <h4 className="text-decoration-underline">Schedule</h4>
        </div>
        
        <div className="text-light cards col-sm-4 p-1 ">
            <h4 className="text-decoration-underline">Progress</h4>
        </div>
        </div>
        </div>
    </div>
  );
}

export default Profile;
