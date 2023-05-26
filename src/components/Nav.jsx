import React from "react";
import Logo from "../images/contact-Logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { BiLogOut, BiLogOutCircle } from "react-icons/bi";
import {RiLogoutCircleRLine} from 'react-icons/ri'
import { useLogoutMutation } from "../redux/api/authApi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { removeUser } from "../redux/services/authSlice";

const Nav = () => {

    const user = JSON.parse(Cookies.get("user"))
    const token = Cookies.get("token")

    const dispatch = useDispatch()

//   const { user } = useSelector((state) => state.authSlice);
//   const { token } = useSelector((state) => state.authSlice);
  console.log(user);
  console.log(token);
  const [logout] = useLogoutMutation();
  const nav = useNavigate()

  const handleLogout = async()=>{
    const {data} = await logout(token);
    dispatch(removeUser());
    if(data?.success) nav('/login')
    console.log(data)
  }

  return (
    <div className="w-[1200px] mx-auto my-5 flex justify-between rounded-lg p-3 py-2  custom-shadow-lg">
      <div className="flex justify-between items-center space-x-3">
        <img src={Logo} width={50} alt="" />
        <h3 className="text-2xl text-gray-300 font-medium">Contacts</h3>
      </div>
      <div className="w-72 flex justify-between items-center space-x-6 relative">
        <div className="">
          <h6 className="text-lg font-semibold">{user?.name}</h6>
          <p>{user?.email}</p>
        </div>
        <div className="group absolute left-36">
          <button onClick={handleLogout} className=" w-10 h-10 duration-300  group-hover:w-28 group-hover:rounded-3xl flex justify-center items-center border-2 border-red-600 group-hover:border-red-600 group-hover:bg-red-600 rounded-3xl">
            <p className="hidden duration-300 group-hover:block group-hover:me-3 group-hover:text-white">Logout</p>
            <RiLogoutCircleRLine className="text-xl font-bold text-red-600 scale-95 duration-200 group-hover:scale-105 group-hover:text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
