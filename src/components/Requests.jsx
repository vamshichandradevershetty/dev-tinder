import axios from "axios";
import { base_URL } from "../utils/Constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";

export const Requests = ()=>{
    const dispatch = useDispatch();
    const requests = useSelector((store)=>store.request);
    const reviewRequests = async(status,_id)=>{
        try{

            const res = await axios.post(base_URL+"/request/review/"+status+"/"+_id,{/*to send data we write here*/},{withCredentials:true})
            dispatch(removeRequests(_id));
            console.log(res);
        }
        catch(err){
            console.error(err);
        }
    }
    
    const pendingRequests = async()=>{
        try{
            const res = await axios.get(base_URL+"/user/requests/received",{withCredentials:true});
           // console.log(res);
            dispatch(addRequests(res.data.data));
        }
        catch(err){
            console.eror(err);
        }
    }
    useEffect(()=>{
        pendingRequests();
    },[])
    if(!requests) return ;
    if(requests.length === 0) return <h1 className=" text-center font-bold text-4xl my-8 ">No Pending Requests Found</h1>
    return (
<div>
        <h1 className="flex justify-center my-8 text-2xl font-bold">Pending Requests</h1>

        <div className="flex flex-col justify-between items-center m-3 p-3 rounded-lg bg-base-300  w-1/2 mx-auto my-5">
                        {
                requests.map(request =>{
                const {_id, firstName,lastName,gender,about,age} = request.fromUserId;
                    return (    
                        <div key={_id} className="flex m-4 p-4 bg-base-300">
                        <h1 className="font-bold text-xl">{firstName +" "+lastName}</h1>               
                        { age && gender && <h2>{age+", "+gender}</h2>}
                        <p>{about}</p>
                        <button className="btn btn-primary mx-2"onClick={()=>{reviewRequests("rejected",request._id)}}>Reject</button>
                        <button className="btn btn-secondary mx-2" onClick={()=>{reviewRequests("accepted",request._id)}}>Accept</button>
                        </div>
                )}
            )
            }
        </div>
 
 </div>
    );
}