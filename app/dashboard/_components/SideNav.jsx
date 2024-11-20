"use client"
// Adjust the path if necessary
import Link from 'next/link';
import Image from 'next/image';
import { LayoutIcon } from '@radix-ui/react-icons';
import { GraduationCap, Hand, Settings } from 'lucide-react';
import React from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { usePathname } from 'next/navigation';

function SideNav() {
    const { user } = useKindeBrowserClient();
    const menuList = [
        {
            id: 1,
            name: 'Dashboard',
            icon: LayoutIcon,
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Students',
            icon: GraduationCap,
            path: '/dashboard/students'
        },
        {
            id: 3,
            name: 'Attendance',
            icon: Hand,
            path: '/dashboard/attendance'
        },
        {
            id: 4,
            name: 'Settings',
            icon: Settings,
            path: '/dashboard/settings'
        },
    ];

    const path = usePathname();

    return (
        <div className="border shadow-md h-screen p-5">
            <Image
                src={'/Logo-jiit.png'}
                width={140}
                height={20}
                style={{ marginLeft: '0px' }} // Adjust value as needed
                alt="logo"
                priority
            />
            <hr className="my-5" />
            {menuList.map((menu) => (
                <Link key={menu.id} href={menu.path}>
                    <h2
                        className={`flex items-center gap-3 text-md p-4
                        text-slate-500
                        hover:bg-primary
                        hover:text-white
                        cursor-pointer
                        rounded-lg
                        my-2
                        ${path === menu.path ? 'bg-primary text-white' : ''}`}
                    >
                        <menu.icon />
                        {menu.name}
                    </h2>
                </Link>
            ))}

            <div className="flex gap-2 items-center bottom-5 fixed p-2">
                {/* Ensure the image src is valid */}
                {user?.picture ? (
                    <Image
                        src={user.picture}
                        width={35}
                        height={35}
                        alt="user"
                        className="rounded-full"
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-white">?</span>
                    </div>
                )}

                <div>
                    <h2 className="text-sm font-bold">
                        {user?.given_name} {user?.family_name}
                    </h2>
                    <h2 className="text-xs text-slate-400">{user?.email}</h2>
                </div>
            </div>
        </div>
    );
}

export default SideNav;
