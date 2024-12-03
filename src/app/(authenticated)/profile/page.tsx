'use client'
import CategoryDivision from "@/components/Analytics/CategoryDivision"
import DailyProgress from "@/components/Analytics/DailyProgress"
import Footer from "@/components/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from "@clerk/nextjs";


const page = () => {
    const { user } = useUser();
    // const handleSubmit = async () => {
    //     fetch('http://localhost:3000/api/weekly', {
    //         method: 'POST',
    //       })
    //         .then((res) => {
    //           if (!res.ok) throw new Error(`Error: ${res.status}`);
    //           return res.json(); // Parse the JSON response
    //         })
    //         .then((data) => console.log(data)) // Log the actual response data
    //         .catch((err) => console.error(err.message));
    // }
    const handleClick = async () =>{
        const response = await fetch('/api/fetch-daily');
        const body = await response.json();
        console.log(body.data)
    }
    return (
    <div className="MainContainer">
        <div className="flex">
            <div className="ProfileSection border-2 border-gray-300 h-auto rounded-md m-1 w-3/12">
                <Avatar className="w-28 h-28 m-5">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>User</AvatarFallback>
                </Avatar>
                <div className="font-semibold mx-5 my-1">
                    <label className="text-gray-600" htmlFor="">Email</label>
                    <p className="text-gray-900">{user?.primaryEmailAddress?.emailAddress}</p>
                </div>
                <div className=" font-semibold mx-5 my-1">
                    <label className="text-gray-600 font-semibold" htmlFor="">Member Since</label>
                    <p className="text-gray-900">{user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          }) 
                        : "No date available"}
                    </p>
                </div>
                <div className="mx-5 my-1">
                    <label className="text-gray-600 font-semibold" htmlFor="">User Id</label>
                    <p className="text-gray-500">{user?.id}</p>
                </div>
               
            </div>
                <div className="AnalysisSection m-1 w-9/12">
                <div className="border-2">
                    <CategoryDivision/>
                </div>
                <div className="border-2">
                    <DailyProgress/>
                </div>
            </div>
            {/* <button className="bg-red-400" onClick={() => {handleClick()}}>Click me </button> */}
        </div>
    </div>    
    )
}

export default page
