import React from "react";
import { Button } from "@/components/ui/button";

const NavigationBar: React.FC = () => {
  return (
    <nav className="fixed left-0 top-0 bottom-0 p-4 bg-blue-600 w-64 text-white overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6">Career Link</h1>
      <div className="space-y-2">
        <Button
          variant="ghost"
          className="justify-start text-white hover:bg-blue-700 w-full"
        >
          Explore
        </Button>
      </div>
    </nav>
  );
};

export default NavigationBar;
