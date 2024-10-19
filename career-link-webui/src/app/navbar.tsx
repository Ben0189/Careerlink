"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

const NavigationBar: React.FC = () => {
  const router = useRouter();
  return (
    <nav className="fixed left-0 top-0 bottom-0 p-4 bg-blue-600 w-64 text-white overflow-y-auto flex flex-col">
      <h1 className="text-2xl font-bold mb-6 cursor-pointer" onClick={() => router.push('/')}>
          Career Link
      </h1>
      <div className="space-y-2">
        <Button variant="ghost" className="justify-start text-white hover:bg-blue-700 w-full">
          Explore
        </Button>
        <Button
          variant="ghost"
          className="justify-start text-white hover:bg-blue-700 w-full"
          onClick={() => router.push('/createPost')}
        >
          Create Post
        </Button>
      </div>

      {/* Bottom Buttons */}
      <div className="mt-auto space-y-2 mb-4">
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
          onClick={() => router.push('/register')}
        >
          Register
        </Button>
      </div>
    </nav>
  );
};

export default NavigationBar;
