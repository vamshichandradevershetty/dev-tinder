import { useSelector } from "react-redux"
import { EditProfile } from "./EditProfile"

export const Profile = ()=>{
   const user = useSelector((store)=>store.user);
    return user && (
        <div>Profile page
        <EditProfile user={user.data}/>
        </div>
    )
}