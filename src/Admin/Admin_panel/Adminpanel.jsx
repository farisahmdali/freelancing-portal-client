import React, { useContext, useEffect, useState } from "react";
import "./admin.css";
import cookies from "js-cookies";
import { userData } from "../../configs/userData";
import { useNavigate } from "react-router-dom";
import instance from "../../axios/axios";
import Chart from "./Chart";
import ConfirmBox from "../../Component/ConfirmBox";

function Admin_panel() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState([]);
  const [confirm,setConfirm] = useState(false);
  const [payment, setPayment] = useState(true);
  const [chart, setChart] = useState(false);
  const [paymentPending, setPendingPayment] = useState([]);
  const val = useContext(userData);
  useEffect(() => {
    instance
      .get("/admin/user")
      .then((res) => {
        setUsers(res?.data.result);
        setSearch(res?.data?.result);
        setPendingPayment(res?.data?.payment || []);
        console.log(res.data);
      }).catch(()=>{
        setConfirm(true);
      })
  }, []);

  return (
    <div className="admin_panel t container">
      {confirm ? <ConfirmBox/>:null}
      <div className="row">
        <div>
          <button
            className="bg-red-500 p-2 rounded  hover:bg-red-600 hover:text-white"
            onClick={() => {
              val.setUser();
              navigate("/", { replace: true });
            }}
          >
            logout
          </button>
          <button
            className="bg-red-500 p-2 rounded  hover:bg-red-600 hover:text-white"
            onClick={() => {
              setPayment(!payment);
            }}
          >
            {payment ? "Payment Requests" : "Users"}
          </button>
          <button
            className="bg-red-500 p-2 rounded  hover:bg-red-600 hover:text-white"
            onClick={() => {
              setChart(!chart);
            }}
          >
            {chart ? "close" : "chart"}
          </button>
        </div>
        {chart ? <Chart /> : null}
        {!payment ? (
          <div className="p-3">
            <table className="w-full text-sm mt-5 text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    email
                  </th>

                  <th scope="col" className="px-6 py-3">
                    amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {" "}
                    upiId
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-2 cursor-point text-red-500 underline whitespace-nowrap"
                  >
                    {" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {paymentPending?.map((x, index) => (
                  <tr
                    className={
                      x?.blocked
                        ? "blocked"
                        : "bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    }
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {x.name}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {x.email}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {+x?.amount/100 || "nill"}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {x?.upiId || "nill"}
                    </td>
                    <td className="px-2 py-2  ">
                      <button
                        className="cursor-point px-2 py-2 pt-1 pb-1 text-white rounded bg-blue-600 whitespace-nowrap"
                        onClick={() => {
                          let confirm = window.confirm("Are you sure ");
                          if (confirm) {
                            instance
                              .post("/admin/paid", {
                                withdrawId: x?._id,
                              })
                              .then(() => {
                                setPendingPayment(
                                  paymentPending?.filter((elem) => {
                                    return elem?._id !== x?._id;
                                  })
                                );
                              });
                          }
                        }}
                      >
                        paid
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <>
            <div className="relative overflow-x-auto p-3">
              <input
                type="text"
                style={{
                  background: "transparent",
                  color: "black",
                  border: "none",
                  border: "1px solid black",
                  padding: "8px",
                  borderRadius: "4px",
                }}
                placeholder="search"
                onChange={(e) =>
                  setSearch(
                    users?.filter((x) => {
                      return x?.username
                        .toLowerCase()
                        .startsWith(e.target.value.toLowerCase());
                    })
                  )
                }
              />
            </div>
            <div className="p-3">
              <table className="w-full text-sm mt-5 text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      #
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Username
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Phone
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {search?.map((x, index) => (
                    <tr
                      className={
                        x?.blocked
                          ? "blocked"
                          : "bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      }
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {index + 1}
                      </th>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {x.name}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {x.username}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {x?.phone || "nill"}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {x?.workAs || "nill"}
                      </td>
                      <td
                        className="px-2 py-2 cursor-point text-red-500 underline whitespace-nowrap "
                        onClick={() => {
                          console.log(x);
                          val.setUser(x);
                          navigate(`/admin_panel/more`);
                        }}
                      >
                        more
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Admin_panel;
