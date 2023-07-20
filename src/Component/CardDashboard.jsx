import React from 'react'
import './cardsDashboard.css'
import { useNavigate } from 'react-router-dom'

function CardDashboard({gig,view}) {
  const navigate=useNavigate()
    let shortdes=""
  let end = true
  for(let i=0;i<120;i++){
    if(!gig?.description[i]){
      end=false
      break;
    }
    shortdes=shortdes+gig?.description[i]
  }
  if(end===true)
  shortdes=shortdes+'...'
  return (
    <div onClick={()=>{
      navigate(`/post/${gig.userId}/${gig._id}`)
    }}>
        <div className="card1">
      <div className="card-content1">
      <img src={gig?.pic} alt={gig?.head} className="card-image1" />
        <h3 className="card-heading1">{gig?.head}</h3>
        <p className="card-description1">{shortdes}</p>
        <div className="card-links1">
        </div>
      </div>
        <p className="card-price1">${gig?.price}</p>
    </div>
    </div>
  )
}

export default CardDashboard