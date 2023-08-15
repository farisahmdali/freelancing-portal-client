import React, { useContext, useState } from "react";
import { userData } from "../configs/userData";
import NavBar2 from "../Component/NavBar2";
import editImg from "../asset/edit-solid.svg";
import DeveloperForm from "./Form";
import profilePic from "../asset/user.png";
import cookies from "js-cookies";
import { useNavigate } from "react-router-dom";
import AddCredit from "../Component/AddCredit";
import PaymentStripe from "../Payment/PaymentStripe";
import Withdraw from "../Payment/Withdraw";

function Profile() {
  let val = useContext(userData);
  console.log(val);
  const [edit, setEdit] = useState("");
  const [addCredit, setAddCredit] = useState(false);
  const [withdraw, setWithdraw] = useState();
  const navigate = useNavigate();
  return (
    <div className="height-100vh-min ">
      {withdraw ? (
        <Withdraw close={setWithdraw} />
      ) : (
        <>
          {addCredit ? (
            <PaymentStripe />
          ) : (
            <>
              <NavBar2 />
              {edit ? (
                <DeveloperForm user={edit} close={setEdit} />
              ) : (
                <div className="bg-gray-100">
                  <div className="container mx-auto my-5 p-5">
                    <div className="md:flex no-wrap  ">
                      <div className="w-full">
                        <div className="bg-white p-3 shadow-sm rounded-sm">
                          <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                            <span clas="text-green-500">
                              <svg
                                className="h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                            </span>
                            <span className="tracking-wide">About</span>
                          </div>
                          <div className="text-gray-700 flex flex-wrap">
                            <div className="grid xl:grid-cols-2 text-sm">
                              <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">
                                  Name
                                </div>
                                <div className=" py-2">{val.user.name}</div>
                              </div>

                              <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">
                                  Contact No.
                                </div>
                                <div className="px-4 py-2">
                                  {val.user.phone}
                                </div>
                              </div>

                              <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">
                                  Email.
                                </div>
                                <div className="text-blue-800 py-2">
                                  {val.user.username}
                                </div>
                              </div>
                              <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">
                                  Occupation
                                </div>
                                <div className="px-4 py-2">
                                  {val.user?.workAs}
                                </div>
                              </div>
                            </div>
                          </div>
                          <button
                            className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
                            onClick={() => setEdit(val?.user)}
                          >
                            Edit
                          </button>
                          <button
                            className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
                            onClick={() => {
                              cookies.removeItem("token");
                              navigate("/login", { replace: true });
                            }}
                          >
                            Logout
                          </button>
                        </div>
                        {/* Profile Card */}
                        <div className="bg-white p-3 border-t-4">
                          <h1 className="text-gray-900 underline font-bold text-xl leading-8 my-1">
                            Progress
                          </h1>
                          <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                            <li className="flex items-center py-3">
                              <span>Rating</span>
                              <span className="ml-auto">
                                {val?.user?.rate
                                  ? Math.round(
                                      (val?.user?.rate.val /
                                        val?.user?.rate.count) *
                                        10
                                    ) / 10
                                  : "nill"}
                              </span>
                            </li>
                            <li className="flex items-center py-3">
                              <span>Number of Reviews</span>
                              <span className="ml-auto">
                                {val?.user?.rate?.count || "nill"}
                              </span>
                            </li>
                          </ul>
                        </div>
                        {/* End of profile card */}
                        <div className="my-4" />
                        {/* Friends card */}

                        {/* End of friends card */}
                      </div>
                      {/* Right Side */}
                      <div className="w-full md:w-9/12 mx-2 h-64">
                        <div className="bg-white p-3 hover:shadow">
                          <div className="flex flex-col overflow-y-auto space-x-3 font-semibold text-gray-900 text-xl leading-8">
                            <span className="underline">Report</span>
                            <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                              {val?.user?.reports?.reports?.map((x) => (
                                <li className="ms-3">{x}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="grid grid-cols-3 height-50vh-min"></div>
                        </div>
                      </div>
                      <div className="w-full md:w-9/12 mx-2 h-64">
                        <div className="bg-white p-3 hover:shadow">
                          <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                            <span className="underline">Credit</span>
                          </div>
                          <h4>Credit : ₹{val?.user?.amount / 100 || 0} </h4>
                          <button
                            className="w-45 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                            onClick={() => setAddCredit(!addCredit)}
                          >
                            Add Credit
                          </button>
                          <button
                            className="w-45 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                            onClick={() => setWithdraw(!withdraw)}
                          >
                            Withdraw
                          </button>

                          <div className="grid grid-cols-3 height-50vh-min"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Profile;
