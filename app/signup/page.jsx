"use client"

import { useState } from 'react';
import InputBox1 from "@/components/InputBox1";
import WelcomeTitle from "@/components/WelcomeTitle";
import Button1 from "@/components/Button1";
import BottomText1 from "@/components/BottomText1";
import { IoEyeOutline } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import axios from 'axios';

const SignupIndex = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSignup = async () => {
        try {
            const response = await axios.post('https://backend1-bukz.onrender.com/api/v1/user/signup', {
                fullname,
                email,
                password
            });

            if (response.status === 200) {
                // Signup successful, store token in local storage
                localStorage.setItem('token', response.data.token);
                // Redirect to dashboard
                router.push('/dashboard');
            } else {
                // Handle other status codes as needed
                console.error('Signup failed:', response.data.message);
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    return (
        <div className="flex justify-center bg-purple-500 h-screen pt-28 pb-32">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 flex flex-col">
                <div className="flex justify-center pt-6 pb-4">
                    <WelcomeTitle title="Welcome to" l_title="Workflo!" />
                </div>
                <div className="px-4 w-full py-2">
                    <input 
                        placeholder="Full Name" 
                        value={fullname} 
                        onChange={(e) => setFullname(e.target.value)} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <div className="px-4 w-full py-2">
                    <input 
                        placeholder="Your email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <div className="px-4 w-full py-2">
                    <input 
                        placeholder="Password" 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <div className="px-4 w-full py-2 cursor-pointer" onClick={handleSignup}>
                    <Button1 label="Sign up" />
                </div>
                <div className="flex justify-center mt-4">
                    <BottomText1 text1="Already have an account?" text2="Log in." goto="login" />
                </div>
            </div>
        </div>
    );
}

export default SignupIndex;
