'use client';

import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import { PaymentMethod, TransactionCategory } from "@prisma/client";
import { useState } from "react";
import useHandleDash from "@/hooks/useHandleDash";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";

const Page = () => {
  
  const { user } = useUser();
  const { toast } = useToast();
  const handleAddTransactions = useHandleDash();

  // State for the form data
  const [data, setData] = useState<{
    paymentFor: string;
    amount: number;
    paymentMethod: PaymentMethod | "";
    category: TransactionCategory | "";
  }>({
    paymentFor: "",
    amount: 0,
    paymentMethod: "",
    category: "",
  });
  type TransactionData = {
    paymentFor : string,
    amount : Number,
    paymentMethod : PaymentMethod,
    category : TransactionCategory,
};
  // Handle input changes
  const handleChange = (field: string, value: string | number) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate data
    if (!data.paymentFor || !data.amount || !data.paymentMethod || !data.category) {
      toast({
        title: "Error",
        description: "All fields are required!",
        variant: "destructive",
      });
      return;
    }
    handleAddTransactions(data as TransactionData);
    // Reset the form
    setData({
      paymentFor: "",
      amount: 0,
      paymentMethod: "",
      category: "",
    });
  };

  return (
    <div>
      <Separator className="h-2 bg-indigo-600" />
      <Navbar />
      <div className="p-4 w-7/12 mx-auto rounded-md my-2">
        <h1 className="text-2xl font-semibold text-indigo-500">
          Add Transaction
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: Payment For and Amount */}
          <div className="flex space-x-4">
            <div className="w-full">
              <label className="block text-sm font-medium mb-1">Payment For</label>
              <input
                type="text"
                placeholder="Payment Done For?"
                value={data.paymentFor}
                onChange={(e) => handleChange("paymentFor", e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium mb-1">Amount</label>
              <input
                type="number"
                placeholder="Amount in Rupees"
                value={data.amount}
                onChange={(e) =>
                  handleChange(
                    "amount",
                    parseInt(e.target.value.replace(/^0+/, '') || '0', 10)
                  )
                }
                onWheel={(e) => e.currentTarget.blur()}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          {/* Row 2: Payment Method and Category */}
          <div className="flex space-x-4">
            <div className="w-full">
              <label className="block text-sm font-medium mb-1">Payment Method</label>
              <select
                value={data.paymentMethod}
                onChange={(e) => handleChange("paymentMethod", e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Payment Method</option>
                {Object.values(PaymentMethod).map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={data.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Category</option>
                {Object.values(TransactionCategory).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default Page;
