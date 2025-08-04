import { useState } from "react";
import { UserCard } from "./UserCard";
import axios from "axios";
import { base_URL } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

export const EditProfile = ({user})=>{
    //console.log(user);
    const [firstName,setFirstName] = useState(user?.firstName || '');
    const [lastName,setLastName] = useState(user?.lastName || '');
    const [age,setAge] = useState(user?.age || '');
    const [gender,setGender] = useState(user?.gender || '');
    const [about, setAbout] = useState(user?.about || '');
    const [photoUrl,setphotoUrl] = useState(user?.photoUrl || null || '');
    const [error,setError] = useState("");
    const [toast,setToast] = useState(false);
    const dispatch = useDispatch();
    const Update = async()=>{
        setError("");
        try{
            const res = await axios.patch(base_URL+"/profile/edit",{firstName,lastName,age,gender,about,photoUrl},{withCredentials:true});
            console.log(res);
            dispatch(addUser(res?.data?.data));
            setToast(true);
            setTimeout(()=>{
                setToast(false);
            },3000);
        }
        catch(err){
            setError(err);
        }

    }
    return (
        <div>
         {  toast && 
        <div className=" toast toast-top toast-center">
        <div className="alert alert-info">
        <span>Profile Update Successfull</span>
        </div>
        </div>
        }
        
        <div className="flex justify-center my-10">
            <div className="flex justify-center mx-10">
        <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
        <h2 className="card-title">Edit Profile</h2>
        <div className="">
        <label className="form-control w-full max-w-xs">
            <div className="label">
               <span className="label-text my-2">FirstName</span> 
            </div>
        <input type="text" value={firstName} placeholder="Enter FirstName" className="input input-bordered w-full max-w-xl" onChange={(e)=>setFirstName(e.target.value)}></input>
        </label>
        <label className="form-control w-full max-w-xs">
            <div className="label">
               <span className="label-text my-2">LastName</span> 
            </div>
        <input type="text" value={lastName} placeholder="Enter LastName" className="input input-bordered w-full max-w-xl" onChange={(e)=>setLastName(e.target.value)}></input>
        </label>
                <label className="form-control w-full max-w-xs">
            <div className="label">
               <span className="label-text my-2">Age</span> 
            </div>
        <input type="number" value={age} placeholder=" Age" className="input input-bordered w-full max-w-xl" onChange={(e)=>setAge(e.target.value)}></input>
        </label>
                <label className="form-control w-full max-w-xs">
            <div className="label">
               <span className="label-text my-2">Gender</span> 
            </div>
        <input type="text" value={gender} placeholder="Gender" className="input input-bordered w-full max-w-xl" onChange={(e)=>setGender(e.target.value)}></input>
        </label>
        <label className="form-control w-full max-w-xs">
            <div className="label">
               <span className="label-text my-2">About</span> 
            </div>
        <input type="text" value={about} placeholder="About" className="input input-bordered w-full max-w-xl" onChange={(e)=>setAbout(e.target.value)}></input>
        </label>
         <label className="form-control w-full max-w-xs">
            <div className="label">
               <span className="label-text my-2">PhotoUrl</span> 
            </div>
        <input type="text" value={photoUrl} placeholder="photoUrl" className="input input-bordered w-full max-w-xl" onChange={(e)=>setphotoUrl(e.target.value)}></input>
        </label>
        </div>
        <p className="text-red-600">{error}</p>
        <div className="card-actions justify-center my-2">
        <button className="btn btn-primary" onClick={Update}>Update Profile</button>
        </div>
        </div>
        </div>
            </div>

            <UserCard user={{firstName,lastName,age,gender,about,photoUrl}}/>
        </div>
        </div>
    );
}