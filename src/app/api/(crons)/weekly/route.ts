import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Calculate date range for the last week
    const today = new Date();
        today.setUTCHours(0, 0, 0, 0); // Set to start of day in UTC
        const lastWeek = new Date(today);
        lastWeek.setUTCDate(today.getUTCDate() - 7);

    // Fetch transactions grouped by userId, category, and week (using date ranges)
    const transactions = await prisma.transactions.groupBy({
      by: ['userId', 'category'],
      _sum: { amount: true },
      _count: { category: true },
      where: {
        createdAt: {
          gte: lastWeek,
          lt: today,
        },
      },
    });

    // Initialize a map to aggregate results by userId
    const userDataMap = new Map<string, {
      totalAmount: number;
      categoryCounts: Record<string, { count: number; amount: number }>;
      weeklyTotals: Array<{ amount: number; date: Date }>;
      categoryTotals: Array<{ categories: Array<{ category: string; count: number; amount: number }>, date: Date }>;
    }>();

    // Process the transactions to group by userId
    for (const txn of transactions) {
      const { userId, category, _sum, _count } = txn;

      // Initialize user data in the map if not already present
      if (!userDataMap.has(userId)) {
        userDataMap.set(userId, {
          totalAmount: 0,
          categoryCounts: {},
          weeklyTotals: [],
          categoryTotals: [],
        });
      }

      const userData = userDataMap.get(userId);

      // Update total amount
      if (userData && _sum.amount) {
        userData.totalAmount += _sum.amount;
      }

      // Update category count and amount
      if (userData && category) {
        if (!userData.categoryCounts[category]) {
          userData.categoryCounts[category] = { count: 0, amount: 0 };
        }
        userData.categoryCounts[category].count += _count.category;
        userData.categoryCounts[category].amount += _sum.amount || 0;
      }
    }

    // Update weekly totals
    const startOfWeek = new Date(lastWeek);
    startOfWeek.setHours(0, 0, 0, 0);

    userDataMap.forEach((data, userId) => {
      // Weekly totals
      data.weeklyTotals.push({
        amount: data.totalAmount,
        date: startOfWeek,
      });

      // Category-wise totals for this week
      data.categoryTotals.push({
        categories: Object.keys(data.categoryCounts).map((category) => ({
          category,
          count: data.categoryCounts[category].count,
          amount: data.categoryCounts[category].amount,
        })),
        date: startOfWeek,
      });
    });

    // Convert the map into an array format for response
    const result = Array.from(userDataMap.entries()).map(([userId, data]) => ({
      userId,
      totalAmount: data.totalAmount,
      weeklyTotals: data.weeklyTotals,
      categoryTotals: data.categoryTotals,
    }));

    // Now update the user records in the database with these calculated fields
    for (const data of result) {
        const findUserSummaryModel = await prisma.expenseSummary.findFirst({
            where : {
                userId : data.userId
            }
        });
        if(findUserSummaryModel){
            await prisma.expenseSummary.update({
                where: { id : findUserSummaryModel.id}, // Assuming the userId is the primary key
                data: {
                  weeklyTotals: data.weeklyTotals,  // Storing weekly totals as JSON
                  categoryTotals: data.categoryTotals,  // Storing category totals as JSON
                },
            });
        }else{
            await prisma.expenseSummary.create({
                data : {
                    userId : data.userId,
                    weeklyTotals: data.weeklyTotals,  // Storing weekly totals as JSON
                    categoryTotals: data.categoryTotals,  // Storing category totals as JSON
                }
            })
        }
      
    }

    // Return the calculated results
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("Error in handler:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
