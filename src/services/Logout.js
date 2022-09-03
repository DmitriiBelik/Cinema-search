/* eslint-disable react/prop-types */
import { Navigate } from "react-router";
import { logout } from "./auth";

export default function LogOut(props){
    if(props.currentUser){
        logout();
        return null;
    }
    else{
        return <Navigate to="/login" replace/>
    }
}