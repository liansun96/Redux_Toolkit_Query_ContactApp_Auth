import React, { useState } from "react";
import Cookies from "js-cookie";
import Logo from "../images/contact-Logo.svg";
import { useUpdatePasswordMutation } from "../redux/api/authApi";
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";

const ChangePassword = () => {
  const token = Cookies.get("token");
  const [updatePassword, { error , isError }] = useUpdatePasswordMutation(token);

  const [current_password, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  const changePasswordHandler = async (e) => {
    e.preventDefault();
    const changedPassword = {
      current_password,
      password,
      password_confirmation,
    };
    // console.log(changedPassword);
    const { data } = await updatePassword({ token, changedPassword });
    console.log(data, isError ,error);    
  };

  return (
    <div>
      <div className="min-h-[100vh] flex flex-col justify-center items-center">
        <div className="w-[450px] h-[600px] border border-[#d3d4d7] rounded-lg flex flex-col justify-center items-center space-y-8">
          <div className="flex flex-col items-center space-y-3">
            <img src={Logo} className="w-[20%]" alt="" />
            <h4 className="font-semibold text-xl">Change Password</h4>
          </div>

          <form onSubmit={changePasswordHandler} className="mt-4 space-y-8">
            <div className="flex items-start">
              <div className="w-[10%]">
                <RiLockPasswordLine className="text-secondary-500 text-xl mt-6" />
              </div>
              <div className="w-[90%] flex flex-col space-y-2 mt-3">
                <input
                  type="password"
                  placeholder="current password"
                  value={current_password}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="border-b-[1px] border-secondary-200 outline-none py-2 "
                />
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-[10%]">
                <RiLockPasswordFill className="text-secondary-500 text-xl mt-6" />
              </div>
              <div className="w-[90%] flex flex-col space-y-2 mt-3">
                <input
                  type="password"
                  placeholder="new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-b-[1px] border-secondary-200 outline-none py-2 "
                />
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-[10%]">
                <RiLockPasswordFill className="text-secondary-500 text-xl mt-6" />
              </div>
              <div className="w-[90%] flex flex-col space-y-2 mt-3">
                <input
                  type="password"
                  placeholder="password confirmation"
                  value={password_confirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
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
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* {isError && <div>Error: {error.message}</div>} */}
    </div>
  );
};

export default ChangePassword;
