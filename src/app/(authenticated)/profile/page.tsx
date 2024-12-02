import CategoryDivision from "@/components/Analytics/CategoryDivision"
import DailyProgress from "@/components/Analytics/DailyProgress"
import MainContainer from "@/components/userProfile/MainContainer"

const page = () => {
    return (
    <div>
        <MainContainer/>
        <div className="flex">
            <div className="w-7/12">
            <DailyProgress/>
            </div>
            <div className="w-5/12 ">
            <CategoryDivision/>

            </div>
        </div>
    </div>    
    )
}

export default page
