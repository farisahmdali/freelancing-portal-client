import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom"
import cookies from "js-cookies"
import instance from '../axios/axios'
import CardDashboard from '../Component/CardDashboard'

function ViewProfiles() {
    const [user,setUser]=useState()
    const {userId} = useParams()
    useEffect(()=>{
        instance.get("/userDetails",{
            params:{
                token:cookies.getItem("token"),
                userId
            }
        }).then((res)=>{
            setUser(res.data.user);
            console.log(res.data.user)
        })
    },[])
  return (
    <div className="container-fluid height-100vh-min">
   
        <div className="row pt-5">
          <div className="d-flex flex-wrap justify-content-between">
            <div className="d-flex flex-wrap">
                <img src={user?.pic} alt="" height={200} className="imgAdmin" />
              <div className="d-flex ms-sm-5 flex-column justify-content-between">
                <div>
              
                    <h2>
                      Username : {user?.username}
                    </h2>
                  
                 
                   
                    
                    <h2>Name : {user?.name}</h2>
                  
                 
                
                
                 
                    <h2>
                      Role : {user?.workAs || "nill"}
                    </h2>
                 
                </div>
              </div>
            </div>
            <div className="cards col-md-6 col-12  border-1 p-1">
              <h4 className="text-decoration-underline">Reports</h4>
            </div>
          </div>
          <div className="pt-5">
            <h4 className="text-decoration-underline">Posts</h4>
            <div className="card-grid">
              {user?.posts[0]?.posts?.map((x) => (
                <CardDashboard
                    gig={{...x,userId:user?._id}}
                />
              ))}
            </div>
          </div>
        </div>
    
    </div>
  )
}

export default ViewProfiles