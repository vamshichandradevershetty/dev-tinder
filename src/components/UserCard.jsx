import axios from "axios";
import { base_URL } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

export const UserCard = ({user})=>{
    //console.log(user);
    const {_id,firstName,lastName,age,gender,about,photoUrl} = user;
    const dispatch = useDispatch();
    const handleRequest = async(status,userId)=>{
      try{
        const res = await axios.post(base_URL+"/request/send/"+status+"/"+userId,{},{withCredentials:true});
        console.log(res); 
        dispatch(removeUserFromFeed(userId))
      }
      catch(err){
        console.error(err);
      }
    }
    return (
        <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt="user photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName +" "+ lastName}</h2>
   {age && gender && <p>{age +", "+gender}</p>}
   {about && <p>{about}</p>}

  </div>
  <div className="flex justify-center my-4">
    <button className="btn btn-primary m-2 p-2" onClick={()=>handleRequest("ignored",_id)}>Ignore</button>
    <button className="btn btn-secondary m-2 p-2" onClick={()=>handleRequest("interested",_id)}>Interested</button>
  </div>
</div>
    );
}