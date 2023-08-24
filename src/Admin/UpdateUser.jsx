import React, { useState } from 'react'
import Loading from '../Loading';
import { Select } from 'antd';
import instance from '../axios/axios';


function UpdateUser({user,close}) {
    const [data, setData] = useState(user);
  
    const [ loading,setLoading] =useState(false);
  
    const type = [
      "Web developer",
      "App developer",
      "Civil Engineer",
      "Bloggers",
      "Sales",
      "Accountance",
      "Editors",
      "Ui/Ux design",
    ];
  
    const Option = Select;
  return (
    <div className="profile update">
        <button className='btn btn-close' onClick={()=>close()}></button><br />
    {loading ? <Loading/> :null}
    <label htmlFor="CV">
      <img
        src={data.pic}
        alt="click and upload"
        height={80}
        className="up-cv"
      />
      <input
        type="file"
        style={{ display: "none" }}
        placeholder="Upload CV"
        name="file"
        onChange={async (e) => {
          setLoading(true)
          let file = e.target.files[0];
          const formData = new FormData();
          file = new File([file], data._id + ".jpg");
          console.log(file);
          formData.append("file", file);
          instance
            .post("/img", formData)
            .then((res) =>{ 
              setData({ ...data, pic: res.data.url })
              setLoading(false)
          })
            .catch((res) => console.log(res));
        }}
        className="up-cv1"
        id="CV"
      />
    </label>
    <br />
    <h4>username : {data.username}</h4>
    <label htmlFor="name">Name:</label>
    <input
      type="text"
      value={data.name}
      onChange={(e) => setData({ ...data, name: e.target.value })}
    />
    <label htmlFor="phone">Phone No:</label>
    <input
      type="number"
      minLength={10}
      value={data.phone}
      onChange={(e) => setData({...data,phone:e.target.value})}
    />
   
   
    
      <div style={{ marginTop: "20px" }}>
        <label htmlFor="">Select you work as : </label>
        <Select
          showSearch
          style={{ width: "200px" }}
          value={data.workAs}
          onChange={(e) => setData({ ...data, workAs: e })}
          className="select"
        >
          {type.map((x) => (
            <Option value={x}>{x}</Option>
          ))}
        </Select>
      </div>
   
    <h4>Rating : {data.rating}</h4>
    <button
      className="btnlogin"
      onClick={async () => {
        await instance
          .post("/updateUser", {
            data,
          })
          close()
        
      }}
    >
      save
    </button>
    
  </div>
  )
}

export default UpdateUser