import React from "react";
import {
  MdOutlineStarBorder,
  MdOutlineModeEdit,
  MdDeleteOutline,
} from "react-icons/md";
import { useGetContactQuery } from "../redux/api/contactApi";
import Cookies from "js-cookie";

const ContactTable = () => {
  const token = Cookies.get("token");

  const { data } = useGetContactQuery(token);
  console.log(data);

  const colors = ["#845EC2", "#D65DB1", "#FFC75F", "#FF9671", "#FF6F91" , "#4B4453" , "#FF8066"];

  return (
    <div className="w-[1200px] mx-auto text-start">
      <div>
        <table className="w-full">
          <thead className="">
            <tr className="border-b-[1px] border-secondary-200 text-sm font-light text-slate-500">
              <th className="text-start font-semibold w-[25%] py-4">Name</th>
              <th className="text-start font-semibold w-[15%]">Email</th>
              <th className="text-start font-semibold w-[15%]">Phone number</th>
              <th className="text-start font-semibold w-[20%]">
                Job title & company
              </th>
            </tr>
          </thead>

          <p className="text-[10px] text-slate-500 font-bold tracking-widest py-2">
            CONTACTS (10)
          </p>

          <tbody>
            {data?.contacts?.data.map((contact) => {
                const randomColorIndex = Math.floor(Math.random() * colors.length);
                const randomColor = colors[randomColorIndex];
              return (
                <tr
                  key={contact.id}
                  className="w-full group/item duration-200 hover:bg-secondary-300 py-3 px-1"
                >
                  <td className="flex justify-start items-center space-x-4 py-3 h-[55px]">
                    <div style={{ backgroundColor: randomColor }} className="w-[40px] h-[40px] text-white text-2xl rounded-full flex justify-center items-center">
                    <p className="">{contact.name.charAt().toUpperCase()}</p>
                    </div>
                    <p>{contact.name}</p>
                  </td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td className="flex justify-between items-center">
                    <p> -  -  -  -  -</p>
                    <div className="hidden group-hover/item:block">
                      <div className="flex items-center space-x-5 duration-400 mr-[15px]">
                        <div className="relative group/edit">
                          <MdOutlineStarBorder className="text-xl text-secondary-500" />
                          <span className="hidden group-hover/edit:block absolute top-5 -left-12 w-[110px] p-2 bg-secondary-500 text-white font-bold rounded scale-[60%]">
                            <p>Star contact</p>
                          </span>
                        </div>
                        <div className="relative group/edit">
                          <MdOutlineModeEdit className="text-xl text-secondary-500" />
                          <span className="hidden group-hover/edit:block absolute top-5 -left-12 w-[110px] p-2 bg-secondary-500 text-white font-bold rounded scale-[60%]">
                            <p>Edit contact</p>
                          </span>
                        </div>
                        <div className="relative group/edit">
                          <MdDeleteOutline className="text-xl text-secondary-500" />
                          <span className="hidden group-hover/edit:block absolute top-5 -left-12 w-[120px] p-2 bg-secondary-500 text-white font-bold rounded scale-[60%]">
                            <p>Delete contact</p>
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactTable;
