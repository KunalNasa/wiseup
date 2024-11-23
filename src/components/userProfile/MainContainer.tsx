'use client'
import { useUser } from '@clerk/nextjs'
import { FaRegUser } from "react-icons/fa";

const MainContainer = () => {
    const { user } = useUser();
    console.log("user details", user);

    return (
        <div className="mx-auto bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full bg-indigo-500 flex items-center justify-center text-white text-4xl">
                    <FaRegUser />
                </div>
            </div>
            <div className="text-center">
                <p className="text-xl font-semibold text-gray-800">{user?.primaryEmailAddress?.emailAddress}</p>
                <p className="text-sm text-gray-500">{user?.id}</p>
            </div>
        </div>
    );
};

export default MainContainer;
