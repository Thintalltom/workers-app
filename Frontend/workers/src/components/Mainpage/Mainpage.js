import React, { useState, useEffect } from "react";
import "./mainpage.css";
import axios from "axios";
import {
  VscAccount,
  VscBook,
  VscDebugStepOver,
  VscOrganization,
} from "react-icons/vsc";
import Workersdashboard from "../Mainpage2/Workersdashboard";
const Mainpage = () => {
  const [workers, setWorkers] = useState([]);
  const info = [
    {
      id: 1,
      text: "Dashboard",
      icon: <VscBook />,
    },
    {
      id: 2,
      text: "Profile",
      icon: <VscAccount />,
    },
    {
      id: 3,
      text: "Leave",
      icon: <VscDebugStepOver />,
    },
    {
      id: 4,
      text: "Admins",
      icon: <VscOrganization />,
    },
  ];

  const getWorkers = async (e) => {
    try {
      await axios.get("http://localhost:5000/workers").then((response) => {
        setWorkers(response.data);
        console.log(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-4 py-4">
      <div className="bg-slate-100 px-4 py-5">
        <h6 className="text-lg font-bold  font-sans text-blue-900">
          Staff Management Board
        </h6>
      </div>
      <div className=" bg-blue-400 flex divide-x-3 justify-start gap-7 border-b-green-400 border-b-4 px-5 py-5 ">
        {info.map((info, id) => (
          <div key={id}>
            <div className="flex hover:bg-sky-300 hover:rounded  hover:w-32 text-center gap-2 p-2 cursor-pointer">
              <div className="mt-1 text-blue-900 "> {info.icon} </div>
              <p className=" gap-3 ">{info.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="container flex  justify-around mx-auto bg-slate-100 px-4 py-4 drop-shadow-sm ">
        <h6>All Employee</h6>
        <input
          type="text"
          className="border-3 w-96 p-1 "
          placeholder="search for employee"
        />
      </div>
      <Workersdashboard getWorkers={getWorkers} workers={workers} />
    </div>
  );
};

export default Mainpage;
