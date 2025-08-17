export const Premium =()=>{
    return (
        <div>
        <div className="flex w-full m-6">
  <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
    <h1 className="font-bold text-2xl">Silver MemberShip</h1>
    <ul>
        <li>Chat with Other People</li>
        <li>200 connection requests per day</li>
        <li>Verified Blue Tick</li>
        <li>Duration 3 months</li>
    </ul>
    <button className="btn bg-primary">Buy Silver</button>
    </div>
  <div className="divider divider-horizontal">OR</div>
  <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
    <h1 className="font-bold text-2xl">Gold MemberShip</h1>
    <ul>
        <li>Chat with Other People</li>
        <li>Unlimited connection requests per day</li>
        <li>Verified Blue Tick</li>
        <li>Duration 6 months</li>
    </ul>
    <button className="btn bg-secondary">Buy Gold</button>
    </div>
</div>
        </div>
    );
}