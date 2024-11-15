'use client';

import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import { PaymentMethod, TransactionCategory } from "@prisma/client";
import { useEffect, useState } from "react";
import useHandleDash from "@/hooks/useHandleDash";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useDebounceValue } from "usehooks-ts";
import { Pagination } from "@/components/Pagination";

const Page = () => {
  
  const { user } = useUser();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounceValue(searchTerm, 300);
  const {handleAddTransaction, allTransactions, handleFetchTransactions, currentPage, totalPages} = useHandleDash(debouncedSearchTerm);

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
  useEffect(() => {
    handleFetchTransactions(1);
  }, [handleFetchTransactions])

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
    handleAddTransaction(data as TransactionData);
    // Reset the form
    setData({
      paymentFor: "",
      amount: 0,
      paymentMethod: "",
      category: "",
    });
  };
  // console.log(allTransactions);
  return (
    <div>
      <Separator className="h-2 bg-indigo-600" />
      <Navbar />
      <div className="p-4 w-11/12 mx-auto rounded-md my-2">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold w-full text-indigo-500">
          Add Transaction
        </h1>
        <input
        className="w-1/2 border-gray-800 rounded-lg border p-2"
        value={searchTerm}
        onChange={(e) => {setSearchTerm(e.target.value)}}
        type="text" 
        placeholder="Search Transactions" />
      </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: Payment For and Amount */}
          <div className="flex space-x-4">
            <div className="w-full">
              <label className="block text-sm text-gray-900 font-semibold mb-1">Payment For</label>
              <input
                type="text"
                placeholder="Payment Done For?"
                value={data.paymentFor}
                onChange={(e) => handleChange("paymentFor", e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm text-gray-900 font-semibold mb-1">Amount</label>
              <input
                type="number"
                placeholder="Amount in Rupees"
                value={Number(data.amount).toString()}
                onChange={(e) =>
                  handleChange(
                    "amount",
                    parseInt(e.target.value)
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
              <label className="block text-sm text-gray-900 font-semibold mb-1">Payment Method</label>
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
              <label className="block text-sm text-gray-900 font-semibold mb-1">Category</label>
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

          <Button type="submit" className="w-full bg-indigo-500 font-semibold">
            Submit
          </Button>
        </form>
        <div className="my-5">
        <h3 className="text-3xl py-5 font-semibold text-indigo-500">Your Previous Transactions</h3>
        {allTransactions.length !== 0? 
        <div>
          {allTransactions.map((item, index) => (
        <div key={index} className="p-4 my-1 bg-white border rounded-md shadow-sm hover:shadow-lg transition">
          <div className="flex justify-between">
            <div className="font-semibold text-lg text-gray-800">{item.paymentFor}</div>
            <div className="text-sm text-gray-500">{item.paymentMethod}</div>
          </div>
          <div className="mt-2 text-gray-600">
            <span className="font-medium">Amount: </span>₹{item.amount.toString()}
          </div>
          <div className="mt-2 text-gray-600">
            <span className="font-medium">Category: </span>{item.category}
          </div>
          <div className="mt-2 text-gray-600">
            <span className="font-medium">On: </span> {new Date(item.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
          })}
          </div>
        </div>
      ))}
        </div> : <div className="font-semibold text-gray-500">No Transactions matched with search string</div>}
        <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => handleFetchTransactions(page)}
    />
        </div>
      </div>
      
    </div>
  );
};

export default Page;
