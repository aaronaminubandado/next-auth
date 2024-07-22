"use client";

import Link from "next/link";
import React,{ useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignUpPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email:"",
        password:"",
        username:"",
    });

    const onSignUp = async () => {
        try {
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup response", response);
            router.push("/login");
        } catch (error:any) {
            console.log("Signup failed", error.response ? error.response.data : error.message);
        }
    };
    

    return (
        <div>
            <form>
                <label htmlFor="username">Username</label>
                <input
                    id="username" 
                    type="text" 
                    value={user.username}
                    onChange={(e) => setUser({...user, username: e.target.value})}
                    placeholder="Username"
                />

                <label htmlFor="email">Email</label>
                <input 
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    placeholder="user@formmail.com" 
                />

                <label htmlFor="password">Password</label>
                <input 
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    placeholder="password" 
                />

                <button className="" onClick={(e) => {
                    e.preventDefault();
                    onSignUp;
                }}>Sign Up</button>
            </form>
            <hr/>
            <Link href="/login">Visit Login Page</Link>
        </div>
    );
}