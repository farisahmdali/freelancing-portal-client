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
    <div className="card flex justify-between flex-col item-center" >
      <div className="card-content">
        <div>
      <img src={imageSrc} alt="Card"  className="card-image cursor-point"  onClick={()=>{
        console.log(fullData)
      navigate(`/post/${val.user._id}/${fullData._id}`)
    }}/>
        </div>
        <h2 className="card-heading">{heading}</h2>
        <p className="card-description">{shortdes}</p>
      </div>
      <div className='flex self-center w-11/12  justify-between'>
        <button className="w-45 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={()=>edit(fullData)}>Edit</button>
        <button className=" focus:outline-none text-white text-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 w-45 " onClick={()=>deletePost()}>Delete</button>
      </div>

    </div>

    
  );
};

export default Card;