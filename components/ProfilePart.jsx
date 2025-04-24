"use client"; // Needed for client-side hooks

import React from 'react';
import { FiLogOut } from "react-icons/fi";
import { useSession, signOut } from 'next-auth/react'; // NextAuth hooks
import Image from 'next/image';
import img from '../public/expense-tracker-app-rgb-color-icon-vector.jpg';

const ProfilePart = () => {
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' }); // This logs out and redirects to home
  };

  return (
    <div className="flex flex-col items-center gap-2 shadow-md rounded-md p-6 dark:bg-gray-900 dark:text-white">
      <div className="w-12 h-12 rounded-full bg-gray-400 overflow-hidden">
        <Image
          src={img}
          alt="Profile"
          className="object-cover"
          width={48}
          height={48}
        />
      </div>
      <h2 className="text-sm font-semibold text-blue-950 dark:text-cyan-50">
        {session?.user?.username || session?.user?.email || "No user logged in"}
      </h2>
      <div>
        <button 
          onClick={handleLogout} 
          className="flex bg-gray-200 items-center gap-2 p-2 border rounded-md hover:bg-red-200 text-blue-950 dark:bg-purple-900 dark:text-white"
        >
          <FiLogOut size={14} />
          <span className='text-xs'>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfilePart;
