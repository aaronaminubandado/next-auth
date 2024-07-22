"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage(){
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            router.push("/");
        } catch (error: any) {
            console.log("Login failed", error.message);
        }finally{
            setLoading(false);
        }
    }

    // const logout = async () => {
	// 	try {
	// 		await axios.get('/api/users/logout');
	// 		router.push('/login');
	// 	} catch (error: any) {
	// 		console.log(error.message);
			
	// 	}
	// }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Login"}</h1>
            <hr />

            <label htmlFor="email">Email</label>
            <input 
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="user@formail.com" 
            />

            <label htmlFor="password">Password</label>
            <input 
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="Password" 
            />
            <button
                onClick={onLogin}>
                Login
            </button>

            <Link href="/signup">Sign up here</Link>
        </div>
    );
}