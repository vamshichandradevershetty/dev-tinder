import axios from "axios"
import { base_URL } from "../utils/Constants"
import { addFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { UserCard } from "./UserCard";

export const Feed = ()=>{
    const dispatch = useDispatch();
    const feed = useSelector((store)=>store.feed);
    const getFeed = async()=>{
            if(feed) return;
            try{
            const res = await axios.get(base_URL+"/feed",{withCredentials:true});
            //console.log(res.data);
            dispatch(addFeed(res.data))
            }
        catch(err){
            console.log(err);
            <Error/>
        }
    }
    useEffect(()=>{getFeed()},[])
    return feed && (
        <div className="my-8 flex justify-center border-b-cyan-50">
        <UserCard user={feed[0]}/>
        </div>
    );
}
export default Feed;