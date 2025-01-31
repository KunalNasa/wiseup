import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const {userId} = await auth();
    if(!userId){
        return NextResponse.json({
            error : "Unauthorised request",
        }, {status : 401});
    }
    try {
        const weeklyData = await prisma.expenseSummary.findFirst({
            where : {
                userId : userId
            }, select : {
                weeklyTotals : true,
                categoryTotals : true
            }
        })
        if(weeklyData){
            return NextResponse.json({
                success : "Weekly data fetched successfully",
                data : weeklyData
            }, {status : 200})
        }
    } catch (error) {
        console.log("Internal Server Error in fetch weekly data");
        return NextResponse.json({
            error : "Internal server error",
        }, {status : 500});
    }
    
}