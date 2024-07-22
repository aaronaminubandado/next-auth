import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function ProfilePage() {
    const router = useRouter();
    const [data,setData] = useState("nothing");

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me');
        setData(res.data.data._id);
    }
    

    return (
        <div>
            <h1>Profile</h1>
            <h2>{data==="nothing" ? "Nothing":`${data}`}</h2>
            <button onClick={getUserDetails}>Details</button>
        </div>
    );

}
