import Cookies from "js-cookie";
import Logo from "../images/contact-Logo.svg";
import { TbCameraPlus, TbCurrentLocation, TbAddressBook } from "react-icons/tb";
import { HiOutlineUser, HiOutlineMail } from "react-icons/hi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { MdOutlinePhone } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { useGetSingleContactQuery, useUpdateContactMutation } from "../redux/api/contactApi";
import { useNavigate, useParams } from "react-router-dom";

const EditContact = () => {
  const token = Cookies.get("token");
  const { id } = useParams();
  const { data: contact } = useGetSingleContactQuery({ id, token });
  // console.log(contact);
  const [updateContact] = useUpdateContactMutation({id,token}) 

  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    setName(contact?.contact?.name);
    setEmail(contact?.contact?.email);
    setPhone(contact?.contact?.phone);
    setAddress(contact?.contact?.address);
  }, [contact]);

  const editHandler = async(e) =>{
    e.preventDefault();
    const newContact = { id, name, email ,phone , address};
    const {data} = await updateContact({token , newContact})
    console.log(data);
    if(data?.success) nav('/')
  }


  return (
    <div>
      <div className="min-h-[100vh] flex flex-col justify-center items-center">
        <div className="w-[450px] h-[600px] border border-[#d3d4d7] rounded-lg flex flex-col justify-center items-center space-y-8">
          <div className="flex flex-col items-center space-y-3">
            <img src={Logo} className="w-[20%]" alt="" />
            <h4 className="font-semibold text-xl">Edit Contact</h4>
          </div>

          <form onSubmit={editHandler} className="mt-4 space-y-8">
            <div className="flex items-start">
              <div className="w-[10%]">
                <HiOutlineUser className="text-secondary-500 text-xl mt-6" />
              </div>
              <div className="w-[90%] flex flex-col space-y-2 mt-3">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-b-[1px] border-secondary-200 outline-none py-2 "
                />
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-[10%]">
                <MdOutlinePhone className="text-secondary-500 text-xl mt-6" />
              </div>
              <div className="w-[90%] flex flex-col space-y-2 mt-3">
                <input
                  type="text"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border-b-[1px] border-secondary-200 outline-none py-2 "
                />
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-[10%]">
                <HiOutlineMail className="text-secondary-500 text-xl mt-6" />
              </div>
              <div className="w-[90%] flex flex-col space-y-2 mt-3">
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-b-[1px] border-secondary-200 outline-none py-2 "
                />
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-[10%]">
                <TbAddressBook className="text-secondary-500 text-2xl mt-6" />
              </div>
              <div className="w-[90%] flex flex-col space-y-2 mt-3">
                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border-b-[1px] border-secondary-200 outline-none py-2 "
                />
              </div>
            </div>
            <div className="w-[360px] flex justify-between items-center">
              <button
                // disabled={isLoading && true}
                type="submit"
                className="py-2 px-6 text-sm font-semibold bg-primary-100 duration-200 hover:bg-primary-200 rounded"
              >
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* {isError && <div>Error: {error.message}</div>} */}
    </div>
  );
};

export default EditContact;
