import React, { useContext, useState } from "react";
import Loading from "../Loading";
import instance from "../axios/axios";
import cookie from "js-cookies";
import { userData } from "../configs/userData";

function ConfirmPayment({ username, amount, userId, close, postId, paid }) {
  const [loading, setLoading] = useState();
  const [payment, setPayment] = useState();
  const { user } = useContext(userData);
  return (
    <div className="min-w-screen min-h-screen bg-gray-200 flex fixed w-full items-center justify-center px-5 pb-10 pt-16">
      <button
        type="button"
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 fixed top-1 left-1"
        onClick={() => close()}
      >
        Close
      </button>
      {loading ? <Loading /> : null}
      {payment ? (
        <div className="bg-gray-100 h-screen">
          {setTimeout(async () => {
            await instance
              .get("/folder", {
                params: {
                  token: cookie.getItem("token"),
                  postId,
                },
                responseType: "blob",
              })
              .then((response) => {
                const downloadLink = document.createElement("a");
                downloadLink.href = URL.createObjectURL(
                  new Blob([response.data])
                );
                downloadLink.download = "project.zip"; // Set the desired file name
                downloadLink.click();
                close();
              });
          }, 3000)}
          <div className="bg-white p-6 fixed w-full height-100vh">
            <svg
              viewBox="0 0 24 24"
              className="text-green-600 w-16 h-16 mx-auto my-6"
            >
              <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              ></path>
            </svg>
            <div className="text-center">
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                Payment Done!
              </h3>
              <p className="text-gray-600 my-2">
                Thank you for completing your secure online payment.
              </p>
              <p> Have a great day!</p>
              <div className="py-10 text-center">
                <a
                  href="#"
                  className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                >
                  GO BACK
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div
        className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700"
        style={{ maxWidth: "600px" }}
      >
        <div className="mb-10">
          <h1 className="text-center font-bold text-xl uppercase">
            Secure payment info
          </h1>
        </div>
        <div className="mb-3">
          <label className="font-bold text-sm mb-2 ml-1">Name on card</label>
          <div>
            <h1
              className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="John Smith"
            >
              {username}
            </h1>
          </div>
        </div>
        <div className="mb-3">
          <label className="font-bold text-sm mb-2 ml-1">Card number</label>
          <div>
            <h1
              className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="0000 0000 0000 0000"
            >
              {amount}
            </h1>
          </div>
        </div>
        <div>
          {!paid ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              onClick={() => {
                if (amount < user.amount) {
                  console.log(user);
                  setLoading(true);
                  instance
                    .post("/transferCredit", {
                      token: cookie.getItem("token"),
                      userId: userId,
                      amount: amount,
                      postId,
                    })
                    .then(() => {
                      setLoading(false);
                      setPayment(true);
                    })
                    .catch(() => {
                      alert("something went wrong");
                    });
                } else {
                  alert("No balance please add some credits");
                }
              }}
            >
              <i className="mdi mdi-lock-outline mr-1"></i> PAY NOW
            </button>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              onClick={async() => {
                await instance
              .get("/folder", {
                params: {
                  token: cookie.getItem("token"),
                  postId,
                },
                responseType: "blob",
              })
              .then((response) => {
                const downloadLink = document.createElement("a");
                downloadLink.href = URL.createObjectURL(
                  new Blob([response.data])
                );
                downloadLink.download = "project.zip"; // Set the desired file name
                downloadLink.click();
                close();
              }).catch((err) => {
                console.log(err);
             })
              }}
            >
              <i className="mdi mdi-lock-outline mr-1"></i> Dowload
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConfirmPayment;
