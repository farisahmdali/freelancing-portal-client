import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import instance from "../../axios/axios";
import Loading from "../../Loading";

function PieChart() {
  const [data, setData] = useState([]);
  useEffect(() => {
    instance.get("/admin/chart").then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <div className="fixed left-0 w-full height-100vh bg-white z-10">
      {!data[0] ? (
        <Loading />
      ) : (
        <Chart
          chartType="PieChart"
          data={data}
          width={"100%"}
          height={"400px"}
        />
      )}
      
    </div>
  );
}

export default PieChart;
