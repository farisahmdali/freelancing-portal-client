import React, { useState } from "react";
import instance from "../axios/axios";
import cookie from "js-cookies"

function Report({userId,close}) {
    const [msg,setMsg]=useState()
  return (
    <div className="fixed w-full flex justify-center items-center top-0 left-0 height-100vh bg-white-600 z-10">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow  ">
        <div className="flex justify-end px-4 pt-4">{/* Dropdown menu */}</div>
        <div className="flex flex-col ps-3 pe-3  pb-2">
          <label
            for="message"
            class="block mb-2 text-md font-medium text-gray-900 "
          >
            Your message
          </label>
          <textarea
            id="message"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900  bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Write your thoughts here..."
            onChange={(e)=>{setMsg(e.target.value)}}
          ></textarea>

          <div className="flex mt-4 self-end space-x-3 ">
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              onClick={()=>{
                instance.post("/report",{
                    userId,
                    msg
                })
                close()
              }}
            >
              Report
            </a>
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200"
              onClick={()=>close()}
            >
              Cancel
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
