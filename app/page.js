"use client"

import { useRouter } from 'next/navigation'
import { LuChevronsUpDown } from "react-icons/lu";

export default function Home() {
  const router = useRouter();

  const navigateToSignup = () => {
    router.push('/signup');
  };

  const navigateToLogin = () => {
    router.push('/login');
  };

  return (
    <main className="bg-white h-screen flex flex-col items-center justify-center">
      <div className="text-4xl font-bold text-purple-600 mb-4">Welcome to Crework Todo Manager</div>
      <div className="text-lg text-gray-700 mb-8">Website Created by Pranav Kumar</div>
      <div className="text-md text-gray-600 mb-4">Please go to signup page if you are new to this website</div>
      <div className="mb-8">
        <button 
          onClick={navigateToSignup}
          className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
        >
          Click Here to go to Signup page
        </button>
      </div>
      <div className="text-md text-gray-600 mb-4">Please go to login page if you already have an account</div>
      <div>
        <button 
          onClick={navigateToLogin}
          className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
        >
          Click Here to go to Login Page
        </button>
      </div>
    </main>
  );
}
