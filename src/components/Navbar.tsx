"use client";
import {motion} from "framer-motion"
import { useRef, useState } from "react";
import Link from "next/link";
import { Button } from "./MyUi/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const [position, setPosition] = useState({
    width : 0,
    left: 0,
    opacity: 0
  })

  return (
    <nav className="w-full bg-gray-50 flex px-10 items-center justify-between py-3 mb-10">
      <div>
        <Image height={200} width={200} src="/Logo.svg" alt="" />
      </div>
      <ul
          className="relative hidden border mx-auto md:flex w-fit rounded-xl border-1 border-violet-400 bg-none p-1"
          onMouseLeave={() => {
            setPosition((pv) => ({
                ...pv,
                opacity : 0
            }))
        }}
      > 
        <Tab setPosition={setPosition}><Button onClick={() => router.replace('/')} variant="secondary">Home</Button></Tab>
        <Tab setPosition={setPosition}><Button onClick={() => router.replace('/#features')} variant="secondary">Features</Button></Tab>
        <Tab setPosition={setPosition}><Button onClick={() => router.replace('/#pricing')} variant="secondary">Pricing</Button></Tab>
        <Cursor position={position} />
      </ul>
      <div className="flex items-center gap-1 md:gap-4">
      <Button variant="secondary" onClick={() => router.replace('/sign-up')}>Sign Up</Button>
      <Button onClick={() => router.replace('/sign-in')}>Sign In</Button>
      </div>
    </nav>
  );
}

export function Tab({ children, setPosition }: { children: React.ReactNode; setPosition: React.Dispatch<React.SetStateAction<{ width: number; left: number; opacity: number }>> }) {
  const ref = useRef(null);
  return (
    <li
    className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs  text-black md:px-5 md:py-2 md:text-base"
    ref={ref}
    onMouseEnter={() => {
      if(ref.current === null) return;

      const { width } = (ref.current as HTMLElement).getBoundingClientRect();
      setPosition({
        width : width/2,
        left: (ref.current as HTMLElement).offsetLeft + width/4,
        opacity: 1
      })
    }}
    >
      {children}
    </li>
  )

}


export function Cursor({ position }: { position: { width: number; left: number; opacity: number } }) {
  return (
      <motion.div
      className="absolute top-12 z-0 h-[2px] rounded-lg bg-violet-500 md:h-[4px]"
      animate={{
          ...position
      }}
      transition={{
          duration : 0.2,
          scale: { type: "spring", visualDuration: 0.7, bounce: 0.7 },
      }}
       />
  )
}