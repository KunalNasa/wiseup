import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const {userId} = await auth();
    if(!userId){
        return NextResponse.json({
            error : "Unauthorized user"
        }, {status : 401});
    }
    try {
        const dailyData = await prisma.expenseSummary.findFirst({
            where : {
                userId : userId
            }, select : {
                dailyTotal : true
            }
        })
        if(dailyData){
            return NextResponse.json({
                message : "Daily data fetched successfully",
                data : dailyData
            }, {status : 200});
        }
    } catch (error) {
        console.log("Internal Server Error in fetching daily total data ",error);
        return NextResponse.json({
            error : "Internal server error"
        }, {status : 500});
    }
    
}