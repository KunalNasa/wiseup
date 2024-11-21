/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";

export async function handler(req: NextRequest) {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const yesterDay = new Date(today);
        yesterDay.setDate(today.getDate() - 1);

        // Fetch daily transactions grouped by userId
        const dailyTransactions = await prisma.transactions.groupBy({
            by: ['userId'],
            _sum: { amount: true },
            where: {
                createdAt: {
                    gte: yesterDay,
                    lt: today,
                },
            },
        });
        // o/p of above query is of type, [{userId : id, {sum : }}]

        for (const txn of dailyTransactions) {
            // Check if an ExpenseSummary exists for the user
            const expenseSummary = await prisma.expenseSummary.findFirst({
                where: { userId: txn.userId },
            });

            const newEntry = {
                amount: txn._sum.amount || 0,
                date: yesterDay.toISOString(), // ISO string for date consistency
            };

            if (expenseSummary) {
                // Update dailyTotal by appending the new entry
                const updatedDailyTotal = Array.isArray(expenseSummary.dailyTotal)
                    ? [...expenseSummary.dailyTotal, newEntry]
                    : [newEntry]; // Initialize as array if null or invalid

                // Update the existing ExpenseSummary
                await prisma.expenseSummary.update({
                    where: { id: expenseSummary.id },
                    data: {
                        dailyTotal: updatedDailyTotal,
                        date: yesterDay,
                    },
                });
            } else {
                // Create a new ExpenseSummary for the user
                await prisma.expenseSummary.create({
                    data: {
                        userId: txn.userId,
                        dailyTotal: [newEntry], // Initialize with the first entry
                        date: yesterDay,
                    },
                });
            }
        }

        return NextResponse.json(
            { message: "Successfully updated ExpenseSummary" },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
