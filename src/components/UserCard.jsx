export const UserCard = ({user})=>{
    //console.log(user);
    const {firstName,lastName,age,gender,about,photoUrl} = user;
    return (
        <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt="user photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName +" "+ lastName}</h2>
   {age || gender && <p>{age +", "+gender}</p>}
   {about || <p>{about}</p>}

  </div>
  <div className="flex justify-center my-4">
    <button className="btn btn-primary m-2 p-2">Ignore</button>
    <button className="btn btn-secondary m-2 p-2">Interested</button>
  </div>
</div>
    );
}