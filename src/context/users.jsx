import { useState, useEffect, useContext, createContext } from "react";
import instance from "../utils/axios";

const UserContext = createContext();
// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {

    const getRequestUsers = async()=>{
        const response = await instance.get(`/api/employee/getEmployeeList?isActive=0&isDeleted=0`) //here check for header is remaining
        // console.log(response.data.meetings);
        return response.data.data;
    }

    const getNotDeletedUsers = async()=>{
        const response = await instance.get(`/api/employee/getEmployeeList?isDeleted=false`) //here check for header is remaining
        // console.log(response.data.meetings);
        return response.data.data;
    }

    const getUsersHistory = async()=>{
        const response = await instance.get(`/api/employee/getEmployeeList?history=1`) //here check for header is remaining
        // console.log(response.data.meetings);
        console.log(response.data.data);
        return response.data.data;
    }

    const getDeleteduserHistory = async()=>{
        const response = await instance.get(`/api/employee/getEmployeeList?isDeleted=true`) //here check for header is remaining
        // console.log(response.data.meetings);
        console.log(response.data.data);
        return response.data.data;
    }


    const [toggle, setToggle] = useState(false)

    return (
        <UserContext.Provider value={{ getRequestUsers, getNotDeletedUsers, getUsersHistory,toggle,setToggle}}>
            {children}
        </UserContext.Provider>
    );
};

// custom hook
const useUserInfo = () => useContext(UserContext);

export { useUserInfo, UserProvider };