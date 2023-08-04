import React from 'react'
import instance from '../axios/axios'
import cookies from "js-cookies"

function Card({ heading,price,reFetch,description,onClick,usersId,postId}) {
  return (
    <div className="d-flex justify-content-between m-2 bg-light border-radius-3" >
      <div className="card-content cursor-point" onClick={onClick}>
        <h2 className="card-heading">{heading}</h2>
        <p className="card-description">{description}</p>
        <p className="card-description">${price}</p>
      </div>
      <div className='d-flex flex-column justify-content-center p-2'>
        <button className="btn-primary" onClick={()=>{
            instance.post("/approvePost",{
                token:cookies.getItem("token"),
                postId,
                usersId
            })
            window.history.back();

        }}>Approve</button>
        <button className=" btn btn-danger mt-1" onClick={()=>{
          instance.delete("/deleteRequestOfAPost/"+usersId+"/"+postId,{
            params:{
              token:cookies.getItem("token"),
            }
            
          }).then(()=>reFetch())
        }}>Delete</button>
      </div>

    </div>
  )
}

export default Card