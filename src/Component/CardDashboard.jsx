import React from "react";
import "./cardsDashboard.css";
import { useNavigate } from "react-router-dom";

function CardDashboard({ gig, view }) {
  const navigate = useNavigate();
  let shortdes = "";
  let end = true;
  for (let i = 0; i < 120; i++) {
    if (!gig?.description[i]) {
      end = false;
      break;
    }
    shortdes = shortdes + gig?.description[i];
  }
  if (end === true) shortdes = shortdes + "...";
  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg"
      onClick={() => {
        if (view) {
          navigate(`/post/${gig.userId}/${gig._id}`);
        }
      }}
    >
      <div className="h-1/2 flex justify-center items-center">
        <img className="h-full w-full" src={gig?.pic} alt={gig?.head} />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{gig?.head}</div>
        <p className="text-gray-700 text-base">{shortdes}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block  px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          ${gig?.price}
        </span>
      </div>
    </div>
  );
}

export default CardDashboard;
