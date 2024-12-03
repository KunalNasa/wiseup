// import Image from "next/image";

import Footer from "@/components/Footer";
import MainContainer from "@/components/HomeComponents/MainContainer";
// import Navbar from "@/components/Navbar";
import { Separator } from "@radix-ui/react-dropdown-menu";


export default function Home() {
  return (
    <div>
      <MainContainer/>
      <Separator className="h-2 bg-indigo-600"/>
      <Footer/>
    </div>
  );
}
