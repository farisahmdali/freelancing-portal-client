import React, { useContext } from 'react'
import './card.css'
import { useNavigate } from 'react-router-dom';
import { userData } from '../configs/userData';

const Card = ({ imageSrc, heading, description,edit,fullData,deletePost }) => {
  const navigate = useNavigate()
  const val = useContext(userData)
  let shortdes=""
  let end = true
  for(let i=0;i<120;i++){
    if(!description[i]){
      end=false
      break;
    }
    shortdes=shortdes+description[i]
  }
  if(end===true)
  shortdes=shortdes+'...'
  return (
    <div className="card justify-content-between" >
      <div className="card-content">
        <div>
      <img src={imageSrc} alt="Card"  className="card-image cursor-point" onClick={()=>{
      navigate(`/post/${val.user._id}/${fullData._id}`)
    }}/>
        </div>
        <h2 className="card-heading">{heading}</h2>
        <p className="card-description">{shortdes}</p>
      </div>
      <div className='d-flex justify-content-between p-1'>
        <button className="btn-primary" onClick={()=>edit(fullData)}>edit</button>
        <button className=" btn btn-danger" onClick={()=>deletePost()}>Delete</button>
      </div>

    </div>
  );
};

export default Card;