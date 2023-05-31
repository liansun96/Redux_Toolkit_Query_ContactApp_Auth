import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetSingleContactQuery } from '../redux/api/contactApi';
import Cookies from 'js-cookie';


const SingleContactInfo = () => {

    const token = Cookies.get("token")

    const {id} = useParams();
    const {data , isError ,error} = useGetSingleContactQuery({id,token})  
    console.log(data , isError ,error ,token)

  return (
    <div>SingleContactInfo</div>
  )
}

export default SingleContactInfo