import React from "react";
import Nav from "../components/Nav";
import ContactTable from "../components/ContactTable";
import { useGetContactQuery } from "../redux/api/contactApi";
import { RevolvingDot } from "react-loader-spinner";

const Dashboard = () => {
  const { data, isLoading } = useGetContactQuery();

  return (
    <div>
      {/* { isLoading ? null : <Nav/>}
      <ContactTable/> */}
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <RevolvingDot
              height="1000"
              width="1000"
              radius="36"
              color="#9173e9"
              secondaryColor=""
              ariaLabel="revolving-dot-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          <div>
            {/* Your navbar component */}
            <Nav />

            {/* Rest of your application */}
            <ContactTable />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
