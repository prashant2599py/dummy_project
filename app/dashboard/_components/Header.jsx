"use client";
import React from 'react';
import Image from 'next/image';
import { useKindeBrowserClient, LogoutLink } from '@kinde-oss/kinde-auth-nextjs'; // Import LogoutLink

function Header() {
    const { user } = useKindeBrowserClient();

    return (
        <div className='p-4 shadow-sm border flex justify-between items-center'>
            <div className="text-lg font-bold">
                <span className="welcome-text">
                    Welcome {user?.given_name || "User"}
                </span>
            </div>
            
            <div className="flex items-center gap-4">
                {/* Check if user.picture exists and is not an empty string */}
                {user?.picture && user.picture !== "" ? (
                    <Image 
                        src={user.picture}
                        width={35}
                        height={35}
                        alt='User Profile'
                        className='rounded-full'
                        priority
                    />
                ) : (
                    // Fallback image or no image
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-white">?</span> {/* Placeholder text */}
                    </div>
                )}
                <LogoutLink>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg">
                        Logout
                    </button>
                </LogoutLink>
            </div>
        </div>
    );
}

export default Header;
