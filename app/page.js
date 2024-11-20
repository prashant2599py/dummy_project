"use client";
import Image from "next/image";
import { LoginLink, RegisterLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs"; // Import LogoutLink
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // useRouter for navigation

export default function Home() {
  const router = useRouter(); // Initialize router for navigation

  useEffect(() => {
    router.push('/api/auth/login?post_login_redirect_url=/dashboard'); // Redirect to login page
  }, [router]);

  return (
    <div>
      <h1>Welcome to Student Attendance System</h1>
      <div>
        <LoginLink>Login</LoginLink> {/* Add login link */}
        <RegisterLink>Register</RegisterLink> {/* Add register link */}
        <LogoutLink>Logout</LogoutLink> {/* Add logout link */}
      </div>
    </div>
  );
}