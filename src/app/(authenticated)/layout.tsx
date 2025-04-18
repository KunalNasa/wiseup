import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <div className="flex md:flex-row flex-col">
            <div className="lg:w-[18%] overflow-y-hidden max-h-screen w-0 hidden md:flex">
                <Sidebar/>
            </div>
            <div className="lg:w-[82%] h-screen overflow-y-scroll w-full md:flex">
                {children}
            </div>
        </div>
  );
}
