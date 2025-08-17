import axios from "axios";
import  { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { base_URL } from "../utils/Constants";
export const Login = ()=>{
    const [emailID,setEmailId] = useState('');
    const [password,setPassword] = useState('');
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName]= useState('');
    const [isLoginForm,setIsLoginForm] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error,setError] = useState("");
    const handleSignUp = async()=>{
      try{
        const res = await axios.post(base_URL+"/signup",{firstName,lastName,emailID,password},{withCredentials:true});
        dispatch(addUser(res.data));
        return navigate("/profile");
      }
      catch(err){
        console.error(err);
        setError(err.response?.data?.error || err.message || "Something went wrong");
      }
    }
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
        setError(err.response?.data?.error || err.message || "Something went wrong");
      } 
    }
    return (
        <>
        <p>Login Page</p>
        <div className="flex justify-center m-10">
        <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
        <h2 className="card-title">{isLoginForm ? "Login" : "Sign Up"}</h2>
        <div className="">
        {!isLoginForm &&(
          <>
          <label className="form-control w-full max-w-xs">
            <div className="label">
               <span className="label-text my-2">First Name</span> 
            </div>
        <input type="text" value={firstName} placeholder="Enter FirstName" className="input input-bordered w-full max-w-xl" onChange={(e)=>setFirstName(e.target.value)}></input>
        </label>
        <label className="form-control w-full max-w-xs">
            <div className="label">
               <span className="label-text my-2">Last Name</span> 
            </div>
        <input type="text" value={lastName} placeholder="Enter LastName" className="input input-bordered w-full max-w-xl" onChange={(e)=>setLastName(e.target.value)}></input>
        </label>
        </>
        )}
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
        <p className="text-red-600">{error}</p>
        <div className="card-actions justify-center my-2">
        <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? "Login":"Sign Up"}</button>
        </div>
        <p className="cursor-pointer m-auto" onClick={()=>{setIsLoginForm(!isLoginForm)}}>{isLoginForm ? "New User SignUp here":"Existing User? Login here"}</p>
        </div>
        </div>
        </div>
        </>
    );
}