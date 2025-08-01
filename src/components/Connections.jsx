import axios from "axios";
import { base_URL } from "../utils/Constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

export const Connections = ()=>{
    const dispatch = useDispatch();
    const connections = useSelector((store)=>store.connection);
    //console.log(connections);
    const fetchConnections = async()=>{
        try{
            const res = await axios.get(base_URL+"/user/connections",{withCredentials:true})
            //console.log(res.data.data);
            dispatch(addConnections(res.data.data));
        }
        catch(err){
            console.error(err);
        }
    }
    useEffect(()=>{
        fetchConnections();
    },[])
    
    if(!connections) return ;
    if(connections.length === 0) return <h1>No Connections Found</h1>

    return  (
        <div className="text-center w-1/2 mx-auto my-10">
            <h1 className="flex justify-center my-8 text-2xl font-bold">Connections</h1>
            {
                connections.map(connection =>{
                const {_id, firstName,lastName,gender,about,age} = connection;
                    return (    
                        <div key={_id} className=" m-4 p-4 bg-base-300">
                        <h1 className="font-bold text-xl">{firstName +" "+lastName}</h1>               
                        { age && gender && <h2>{age+", "+gender}</h2>}
                        <p>{about}</p>
                        </div>
                )}
            )
            }
        </div>
    );
}