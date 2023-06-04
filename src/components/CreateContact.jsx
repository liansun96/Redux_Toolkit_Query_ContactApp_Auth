import React, { useState } from "react";
import Logo from "../images/contact-Logo.svg";
import { TbCameraPlus, TbCurrentLocation, TbAddressBook } from "react-icons/tb";
import { HiOutlineUser, HiOutlineMail } from "react-icons/hi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { MdOutlinePhone } from "react-icons/md";
import { useCreateContactMutation } from "../redux/api/contactApi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const CreateContact = () => {
  const token = Cookies.get("token");
  const [createContact, { isLoading, isError, error }] =
    useCreateContactMutation(token);
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    const contact = { name, email, phone, address };
    const { data } = await createContact({ token, contact });
    console.log(data);
    if (data?.success) nav("/");
    console.log(isError);
  };

  return (
    <div>
      <div className="min-h-[100vh] flex flex-col justify-center items-center">
        <div className="w-[450px] h-[600px] border border-[#d3d4d7] rounded-lg flex flex-col justify-center items-center space-y-8">
          <div className="flex flex-col items-center space-y-3">
            <img src={Logo} className="w-[20%]" alt="" />
            <h4 className="font-semibold text-xl">Create New Contact</h4>
          </div>

          <form onSubmit={handleCreate} className="mt-4 space-y-8">
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
                  type="number"
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
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      {isError && <div>Error: {error.message}</div>}
    </div>
  );
};

export default CreateContact;
