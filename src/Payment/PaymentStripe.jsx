import { useCallback, useState } from "react";
import useRazorpay from "react-razorpay";
import instance from "../axios/axios";
import cookie from "js-cookies"

export default function App() {
  const [Razorpay] = useRazorpay();
  const [amount,setAmount] = useState()

  const handlePayment = async (e) => {
    e.preventDefault()
    console.log(amount)
    const order = await instance.get("/orderPayment",{
      params:{
        token:cookie.getItem("token"),
       amount:parseInt(amount)*100,
      }
    }).then((res)=>{
      console.log(res.data)
      return res
      // window.location.reload()
    })

    console.log(order);

    const options = {
      key: "rzp_test_SZISjiHbBlmqCl", // Enter the Key ID generated from the Dashboard
      amount: order.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
      handler: function (response) {
       instance.post("addCreditForUser",{
        token:cookie.getItem("token"),
        amount:order.data.amount,
       }).then(()=>{
        console.log("Success")
        window.location.reload()
       })
      },
      prefill: {
        name: "Piyush Garg",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }

  return (
    <div className="w-full height-100vh bg-black flex justify-center items-center">
      <form onSubmit={handlePayment} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg  shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
           Enter The Amount To Add
          </h5>
       <input onChange={(e)=>setAmount(e.target.value)} min={0}  type="number" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the Amount" required />

        <button
          className="inline-flex mt-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Proceed
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
