import Image from "next/image";
import NavigationBar from "./navbar";
import ListofPost from "./list-of-post"
import { useState } from "react";

export default function Home() {
  return (
    <>
    <NavigationBar/>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ListofPost/>
  </main>
    </>
    
  );
}
