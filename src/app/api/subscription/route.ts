import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { error } from "console";

export async function POST(req : NextRequest) {
    const {userId} = await auth();
    if(!userId){
        return NextResponse.json({
            error : "Unauthorized user"
        }, {status : 400});
    }
    try {
        const user = await prisma.user.findUnique({
            where : {
                id : userId
            }
        })
        if(!user){
            return NextResponse.json({
                error : "No user found"
            }, {status : 404});
        }
        // payment method here
        const subscriptionEnd
        
    } catch (error) {
        
    }

    
    
}