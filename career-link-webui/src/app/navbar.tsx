"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext'; // 引入 useAuth
import Link from 'next/link';

const NavigationBar: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth(); // 获取登录状态、用户信息和登出方法

  const handleLogout = () => {
    logout();
    router.push('/login'); // 重定向到登录页面
  };

  return (
    <nav className="flex-col p-4 bg-blue-600 w-64 text-white">
      <h1 className="text-2xl font-bold mb-6 cursor-pointer" onClick={() => router.push('/')}>
        Career Link
      </h1>
      {isAuthenticated && (
        <div className="mb-4">
          <p className="text-lg">Welcome, {user}</p>
        </div>
      )}

      <div className="space-y-2">
        <Button variant="ghost" className="justify-start text-white hover:bg-blue-700 w-full">
          <Link href="/listOfPost">
            <span>Explore</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="justify-start text-white hover:bg-blue-700 w-full"
        >
          <Link href="/createPost">
            <span>Create Post</span>
          </Link>
        </Button>
      </div>

      <div className="mt-auto space-y-2 mb-4">
        {isAuthenticated ? (
          <Button
            variant="ghost"
            className="justify-start text-white hover:bg-blue-700 w-full"
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : (
          <>
            <Button
              variant="ghost"
              className="justify-start text-white hover:bg-blue-700 w-full"
              onClick={() => router.push('/login')}
            >
              Login
            </Button>
            <Button
              variant="ghost"
              className="justify-start text-white hover:bg-blue-700 w-full"
            >
              <Link href="/createPost">
                <span>Register</span>
              </Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
