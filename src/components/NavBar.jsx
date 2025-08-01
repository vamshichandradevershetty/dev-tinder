import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import { base_URL } from "../utils/Constants";
import { removeUser } from "../utils/userSlice";

export const NavBar = ()=>{
    const user = useSelector((store)=>store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //console.log(user);
   const handleLogOut = async()=>{
    try{
      await axios.post(base_URL+"/logout",{},{withCredentials:true});
      dispatch(removeUser());
      return navigate("/Login");
    }
    catch(err){
      console.error(err);
      navigate("/Error");
    }

   }
    return (
        <>
<div>
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to="/"className="btn btn-ghost text-xl">DevTinder</Link>
     </div>
    {user && (<div className="flex-none gap-2">
        <div className="form-control">Welcome {user.firstName}</div>
    <div className="dropdown dropdown-end mx-5 flex">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            src={user.photoURL} alt="photo url" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile"className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
         <li>
          <Link to="/connections"className="justify-between">
            Connections
         </Link>
        </li>
        <li>
          <Link to="/requests"className="justify-between">
            pendingRequests
         </Link>
        </li>
        <li><a>Settings</a></li>
        <li><Link onClick={handleLogOut}>Logout</Link></li>
      </ul>
    </div>
    </div>)}
    </div>
</div>
        </>
    )
}
export default NavBar;