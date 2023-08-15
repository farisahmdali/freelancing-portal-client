import React from "react";
import "./loading.scss";

function Loading() {
  return (
    <div className="wrap">
      <div className="loading">
        <div className="bounceball" />
        <div className="text">NOW LOADING</div>
      </div>
    </div>
  );
}

export default Loading;
