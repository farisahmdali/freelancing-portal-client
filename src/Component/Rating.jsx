import { Rate } from "antd";
import React, { useState } from "react";
import instance from "../axios/axios";
import cookie from "js-cookies";

function Rating({ userId, close }) {
  const [value, setValue] = useState();
  return (
    <div className="fixed w-full height-100vh flex flex-col justify-center bg-blue-200 z-20 top-0 left-0">
      <button
        className="bg-red-500 hover:bg-red-600 pt-2 pb-2 pe-3 ps-3 top-20 fixed left-5 rounded-full text-white"
        onClick={() => close()}
      >
        {"X"}
      </button>
      <div className="self-center bg-white p-5 rounded">
      <Rate onChange={(e) => setValue(e)} /><br/><br/>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          instance.post("/rate", {
            userId: userId,
            rating: value,
          }).then(()=>{
            close()
          })
        }}
      >
        Submit
      </button>
      </div>
    </div>
  );
}

export default Rating;
