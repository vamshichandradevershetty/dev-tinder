import axios from "axios";
import  { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { base_URL } from "../utils/Constants";

export const Login = ()=>{
    const [emailID,setEmailId] = useState('rahuldravid@gmail.com');
    const [password,setPassword] = useState('User@1234');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = async()=>{
      try{
        const res = await axios.post(base_URL+"/login",{
            emailID,password,
        },{withCredentials:true}); //to set cookies we use setcredentials as true
        console.log(res.data);
        dispatch(addUser(res.data))
        return navigate("/");
        
      } 
      catch(err){
        console.error(err);
      } 
    }
    return (
        <>
        <p>Login Page</p>
        <div className="flex justify-center m-10">
        <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
        <h2 className="card-title">Login</h2>
        <div className="">
        <label className="form-control w-full max-w-xs">
            <div className="label">
               <span className="label-text my-2">Email ID</span> 
            </div>
        <input type="email" value={emailID} placeholder="Enter Email" className="input input-bordered w-full max-w-xl" onChange={(e)=>setEmailId(e.target.value)}></input>
        </label>
        <label className="form-control w-full max-w-xs">
            <div className="label">
               <span className="label-text my-2">Password</span> 
            </div>
        <input type="password" value={password} placeholder="Enter Password" className="input input-bordered w-full max-w-xl" onChange={(e)=>setPassword(e.target.value)}></input>
        </label>
        </div>
        <div className="card-actions justify-center my-2">
        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
        </div>
        </div>
        </div>
        </div>
        </>
    );
}