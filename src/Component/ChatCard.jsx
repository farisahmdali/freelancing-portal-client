import React from "react";

function ChatCard({ users,msgUser }) {
  const uniqueArray = users.filter((value, index, self) => {
    // Find the index of the first occurrence of the username in the array
    const firstIndex = self.findIndex(
      (item) => item.username === value.username
    );
    // Keep the current object if its index is the same as the first index (i.e., it's the first occurrence)
    return index === firstIndex;
  });
  console.log(users);
  return (
    <div className="sm:float-left hide-650">
      <div
        id="Main"
        className="xl:rounded-r transform  xl:translate-x-0 ease-in-out transition duration-500 pt-3 flex justify-start items-start h-full  w-full sm:w-64 bg-gray-900 flex-col"
      >
        <div
          id="menu1"
          className="flex justify-start height-100vh-min  flex-col w-full md:w-auto items-start pb-1 "
        >
          {uniqueArray?.map((x) => (
            <button onClick={()=>{msgUser(x)}} className="flex justify-start items-center  hover:text-white focus:bg-gray-900 focus:text-white hover:bg-gray-900 text-gray-400 rounded px-3 py-2  w-full md:w-52">
              <img src={x.pic} width={30} />
              <p className="text-base leading-4  ">{x.username}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatCard;
