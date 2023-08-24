import React, { useContext, useEffect } from "react";
import { userData } from "../configs/userData";
import { useNavigate } from "react-router-dom";
import instance from "../axios/axios";
import cookies from "js-cookies";

function NavBar2({children}) {
  const val = useContext(userData);
  const navigate = useNavigate();
  console.log(children)
  useEffect(() => {
    if (!val.user) {
      instance
      .post("/login")
      .then((res) => {
        val.setUser(res.data.userDetail);
      })
      .catch((res) => {
        cookies.removeItem("token");
        navigate("/login", { replace: true });
      });
    }
  });
  return (
    <>
      <nav className="bg-gray-900 transition-05s w-full z-20 top-0 left-0 border-b border-gray-200 border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div
            className="flex items-center"
            onClick={() => navigate("/", { replace: true })}
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              GetDone
            </span>
          </div>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            class="inline-flex items-center p-2 btn-down w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            class="hidden slide-down transform w-full md:block md:w-auto"
            id="navbar-default"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li onClick={() => navigate("/dashBoard")} className="text-white">
                Dashboard
              </li>
              <li onClick={() => navigate("/myPosts")} className="text-white">
                My Post
              </li>
              <li
                onClick={() => navigate("/notification")}
                className="text-white"
              >
                Connection
              </li>
              <li onClick={() => navigate("/saved")} className="text-white">
                Saved
              </li>
              <li onClick={() => navigate("/profile")} className="text-white">
                Profile
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {children}
    </>
  );
}

{
  /* <Navbar expand="lg" bg="primary" data-bs-theme="dark" className="bg-body-tertiary">
<Container>
  <Navbar.Brand onClick={()=>navigate('/',{replace:true})} className="cursor-point">Get Done</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto">
    <Nav.Link onClick={()=>navigate('/dashBoard')} >DashBoard</Nav.Link>
        <Nav.Link onClick={()=>navigate('/myPosts')}>My Posts</Nav.Link>
        <Nav.Link  onClick={()=>navigate('/notification')}>Notification</Nav.Link>
        <Nav.Link  onClick={()=>navigate('/profile')}>Saved</Nav.Link>
        <Nav.Link  onClick={()=>navigate('/profile')}>Profile</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Container>
</Navbar> */
}

export default NavBar2;
