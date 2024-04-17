import Image from "next/image";
import HomePage from './Home'
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <HomePage/>
    </div>
   
  );
}
