/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { TransactionCategory, PaymentMethod } from "@prisma/client";
export async function POST(req:NextRequest) {
    const {userId} = await auth();

    if(!userId){
        return NextResponse.json({
            error : "Unauthorised user"
        }, {status : 401})
    }
    
    try {
        const {paymentMethod, paymentFor, amount, category} = await req.json();
        if(!paymentFor || !paymentMethod || !amount || !category){
            return NextResponse.json({
                error : "Incomplete field"
            }, {status : 400});
        }
        if (!Object.values(TransactionCategory).includes(category as TransactionCategory)) {
            return NextResponse.json({
                error: "Invalid transaction category"
            }, { status: 400 });
        }
        
        if (!Object.values(PaymentMethod).includes(paymentMethod as PaymentMethod)) {
            return NextResponse.json({
                error: "Invalid payment method"
            }, { status: 400 });
        }
        const addTransactions = await prisma.transactions.create({
            data : {
                userId,
                amount,
                paymentMethod,
                paymentFor,
                category
            }
        });
        if(addTransactions){
            return NextResponse.json({
                transaction : addTransactions
            }, {status : 200})
        }
        return NextResponse.json({
            error : "Failed to add transaction"
        }, {status : 400});
    } catch (error : any) {
        console.error("Internal server error in creating a transaction", error.message);
        return NextResponse.json({
            error : error.stack
        }, {status : 500});
    }
}