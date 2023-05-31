import React, { useEffect } from "react";
import {
  MdOutlineStarBorder,
  MdOutlineModeEdit,
  MdDeleteOutline,
  MdInfoOutline,
} from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { useDeleteContactMutation, useGetContactQuery } from "../redux/api/contactApi";
import Cookies from "js-cookie";
import { MutatingDots, RevolvingDot } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addContacts, setSearchContact } from "../redux/services/contactSlice";

const ContactTable = () => {
  const colors = [
    "#845EC2",
    "#D65DB1",
    "#FFC75F",
    "#FF9671",
    "#4B4453",
    "#FF8066",
  ];
  const token = Cookies.get("token");

  const { data } = useGetContactQuery(token);
  const  [deleteContact] = useDeleteContactMutation();
  // console.log(data);
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contactSlice.contacts);
  const searchContact = useSelector(
    (state) => state.contactSlice.searchContact
  );

  
  useEffect(() => {
    dispatch(addContacts(data?.contacts?.data));
  }, [data]);

  const row = contacts
    ?.filter((item) => {
      if (searchContact === "") {
        return item;
      } else if (
        item.name.toLowerCase().includes(searchContact?.toLocaleLowerCase())
      ) {
        return item;
      }
    })
    .map((contact) => {
      const randomColorIndex = Math.floor(Math.random() * colors.length);
      const randomColor = colors[randomColorIndex];
      return (
        <tr
          key={contact?.id}
          className="w-full group/item duration-200 hover:bg-secondary-300 py-3 px-1 p-4"
        >
          <td className="flex  justify-start items-center space-x-4 px-3 py-3 h-[55px]">
            <div
              style={{ backgroundColor: randomColor }}
              className="w-[40px] h-[40px] text-white text-2xl rounded-full flex justify-center items-center"
            >
              <span className="">{contact.name.charAt().toUpperCase()}</span>
            </div>
            <p>{contact.name}</p>
          </td>
          <td className="">{contact.email}</td>
          <td className="">{contact.phone}</td>
          <td className="flex justify-between items-center">
            <p>{contact.address}</p>
            <div className="hidden group-hover/item:block">
              <div className="flex items-center space-x-5 duration-400 mr-[15px]">
                <div className="relative group/edit">
                  <MdOutlineStarBorder className="text-xl text-secondary-500" />
                  <span className="hidden group-hover/edit:block absolute top-5 -left-6 w-[70px] p-2 bg-secondary-500 text-white font-bold rounded scale-[60%]">
                    <p className="text-center">Star</p>
                  </span>
                </div>
                <Link to={`/singleContactInfo/${contact?.id}`}>
                  <div className="relative group/edit">
                    <MdInfoOutline className="text-xl text-secondary-500" />
                    <span className="hidden group-hover/edit:block absolute top-5 -left-6 w-[70px] p-2 bg-secondary-500 text-white font-bold rounded scale-[60%]">
                      <p className="text-center">Info</p>
                    </span>
                  </div>
                </Link>
                <Link to={`/editContact/${contact?.id}`}>
                  <div className="relative group/edit">
                    <MdOutlineModeEdit className="text-xl text-secondary-500" />
                    <span className="hidden group-hover/edit:block absolute top-5 -left-6 w-[70px] p-2 bg-secondary-500 text-white font-bold rounded scale-[60%]">
                      <p className="text-center">Edit</p>
                    </span>
                  </div>
                </Link>
                <button onClick={()=>deleteContact({id:contact?.id,token})} className="relative group/edit">
                  <MdDeleteOutline className="text-xl text-secondary-500" />
                  <span className="hidden group-hover/edit:block absolute top-5 -left-6 w-[70px] p-2 bg-secondary-500 text-white font-bold rounded scale-[60%]">
                    <p className="text-center">Delete</p>
                  </span>
                </button>
              </div>
            </div>
          </td>
        </tr>
      );
    });

  return (
    <div className="w-[1200px] mx-auto text-start">
      <div className="flex items-center space-x-3">
        <Link to="/createContact">
          <button className="group flex items-center space-x-4 py-2 px-4 rounded-[40px] duration-300 custom-shadow-md hover:custom-shadow-lg hover:duration-200">
            <div className="">
              <svg width="36" height="36" viewBox="0 0 36 36">
                <path fill="#34A853" d="M16 16v14h4V20z"></path>
                <path fill="#4285F4" d="M30 16H20l-4 4h14z"></path>
                <path fill="#FBBC05" d="M6 16v4h10l4-4z"></path>
                <path fill="#EA4335" d="M20 16V6h-4v14z"></path>
                <path fill="none" d="M0 0h36v36H0z"></path>
              </svg>
            </div>
            <h6 className="duration-300 group-hover:text-primary-200">
              Create contact
            </h6>
          </button>
        </Link>
        <div className="w-[40%] h-[48px] flex justify-start items-center space-x-4 rounded-lg bg-secondary-300">
          <div className="w-[40px] h-[40px] flex justify-center items-center rounded-full hover:bg-secondary-200 ml-2">
            <AiOutlineSearch className="text-secondary-500 text-2xl font-bold" />
          </div>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => dispatch(setSearchContact(e.target.value))}
            value={searchContact}
            className="outline-none w-[90%] bg-secondary-300"
          />
        </div>
      </div>
      <div>
        <table className="w-full">
          <thead className="">
            <tr className="border-b-[1px] border-secondary-200 text-sm font-light text-slate-500">
              <th className="text-start font-semibold w-[20%] py-4">Name</th>
              <th className="text-start font-semibold w-[25%]">Email</th>
              <th className="text-start font-semibold w-[15%]">Phone number</th>
              <th className="text-start font-semibold w-[30%]">Address</th>
            </tr>
          </thead>

          <p className="text-[10px] text-slate-500 font-bold tracking-widest py-2">
            CONTACTS (10)
          </p>

          <tbody>{row}</tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactTable;
