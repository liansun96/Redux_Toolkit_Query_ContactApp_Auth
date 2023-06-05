import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useEffect } from "react";

const Pagination = () => {
    const token = Cookies.get("token");
  const [contacts, setContacts] = useState([]);
  const [num, setNum] = useState(2);


    const getContacts = async () => {
        const { data } = await axios.get(
          `https://contact-app.mmsdev.site/api/v1/contact?page=${num}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setContacts(data);
        console.log(data)
      };

      useEffect(()=>{
        getContacts()
      },[])
  return <div>Pagination</div>;
};

export default Pagination;
