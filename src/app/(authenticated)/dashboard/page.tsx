'use client';

import { useDebounceValue } from "usehooks-ts";
import useHandleDash from "@/hooks/useHandleDash";

import { Pagination } from "@/components/Pagination";
import { useEffect, useState } from "react";
import TransactionSearchBar from "@/components/DashboardComponents/TransactionSearchBar";
import TransactionForm from "@/components/DashboardComponents/TransactionForm";
import TransactionsList from "@/components/DashboardComponents/TransactionList";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounceValue(searchTerm, 300);

  const {
    handleAddTransaction,
    allTransactions,
    handleFetchTransactions,
    currentPage,
    totalPages,
  } = useHandleDash(debouncedSearchTerm);

  useEffect(() => {
    handleFetchTransactions(1);
  }, [handleFetchTransactions]);

  return (
    <div className="p-10 w-full mx-auto rounded-md my-2">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold w-full text-indigo-500">Add Transaction</h1>
        <TransactionSearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>

      <TransactionForm onSubmit={handleAddTransaction} />

      <div className="my-5">
        <h3 className="text-3xl py-5 font-semibold text-indigo-500">Your Previous Transactions</h3>
        <TransactionsList transactions={allTransactions} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => handleFetchTransactions(page)}
        />
      </div>
    </div>
  );
};

export default Page;
