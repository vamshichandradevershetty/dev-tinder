import { Outlet, useNavigate } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import axios from "axios";
import { base_URL } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

export const Body = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store)=> store.user);
    const fetchUser = async()=>{
        try{
        const user = await axios.get(base_URL+"/profile/view",{withCredentials:true});
        dispatch(addUser(user));
        
    }
        catch(err){
            if(err.status === 401){
            navigate("/login");
            }
            }
    }
    useEffect(()=>{
        if(!userData){
        fetchUser();
        }
    },[]);
    return (
        <>
        <NavBar/>
        <Outlet/>
        <Footer/>
        </>
    );
}