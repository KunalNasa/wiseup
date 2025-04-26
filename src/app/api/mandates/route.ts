import prisma from "@/lib/prisma";
import { TransactionCategory } from "@prisma/client";
import { promises as fs } from "fs"; 
import { NextRequest, NextResponse } from "next/server";
import path from "path";

async function logEntry(mandate: any) {
    const logsPath = path.join(process.cwd(), "src/app/api/mandates/logs.json"); 
    let existingLogs = [];

    try {
        const data = await fs.readFile(logsPath, "utf8");
        existingLogs = JSON.parse(data);
    } catch (error) {
        console.error("Log file not found or unreadable, creating a new one.");
    }

    existingLogs.push(mandate);

    await fs.writeFile(logsPath, JSON.stringify(existingLogs, null, 2)); 
}

export async function GET(req: NextRequest) {
    const allMandates = await prisma.mandates.findMany();

    for (let i = 0; i < allMandates.length; i++) {
        const mandate = allMandates[i];
        const startDate = Number(mandate.startDate);
        const repeat = mandate.repeat;
        const amount = mandate.amount;
        const paymentMethod = mandate.paymentMethod;
        const paymentFor = mandate.paymentFor;
        const userId = mandate.userId;
        const today = Number(Date.now());

        if (today < startDate) {
            continue;
        }

        const timeDifference = today - startDate;

       // timeDifference is in milliseconds
        if (timeDifference % repeat === 0) {
            try {
                await prisma.transactions.create({
                    data: {
                        userId,
                        paymentFor,
                        paymentMethod,
                        amount,
                        category: TransactionCategory.OTHERS,
                    },
                });
            } catch (error: any) {
                console.error("Transaction creation failed, logging the mandate...");
                await logEntry(mandate);
            }
        }
    }

    return NextResponse.json({ message: "Mandate check complete." });
}
