"use client"

import { useState } from 'react';
import InputBox1 from "@/components/InputBox1";
import WelcomeTitle from "@/components/WelcomeTitle";
import Button1 from "@/components/Button1";
import BottomText1 from "@/components/BottomText1";
import { useRouter } from 'next/navigation';
import axios from 'axios';

const LoginIndex = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleLogin = async () => {
        setError(''); // Reset error message

        if (!email || !password) {
            setError('Please fill out both fields');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        try {
            const response = await axios.post('https://backend1-bukz.onrender.com/api/v1/user/signin', {
                email,
                password
            });

            if (response.status === 200) {
                // Login successful, store token in local storage
                localStorage.setItem('token', response.data.token);
                // Redirect to dashboard
                router.push('/dashboard');
            } else {
                // Handle other status codes as needed
                setError('Login failed: ' + response.data.message);
            }
        } catch (error) {
            setError('Error during login: ' + error.message);
        }
    };

    return (
        <div className="flex justify-center bg-purple-500 h-screen pt-28 pb-32">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 flex flex-col" style={{ minHeight: '400px' }}>
                <div className="flex justify-center pt-6 pb-4">
                    <WelcomeTitle title="Welcome back to" l_title="Workflo!" />
                </div>
                <div className="px-4 w-full py-2">
                    <input 
                        placeholder="Your email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                    />
                </div>
                <div className="px-4 w-full py-2">
                    <input 
                        placeholder="Password" 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                    />
                </div>
                {error && (
                    <div className="px-4 w-full py-2 text-red-500">
                        {error}
                    </div>
                )}
                <div className="px-4 w-full py-2 cursor-pointer" onClick={handleLogin}>
                    <button className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                        Log in
                    </button>
                </div>
                <div className="flex justify-center mt-4">
                    <BottomText1 text1="Don't have an account? Create a" text2="new account." goto="signup" />
                </div>
            </div>
        </div>
    );
}

export default LoginIndex;
