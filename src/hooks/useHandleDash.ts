import { PaymentMethod, TransactionCategory } from "@prisma/client";
import { useCallback, useState } from "react";
import { toast } from "./use-toast";
type TransactionData = {
    paymentFor : string,
    amount : Number,
    paymentMethod : PaymentMethod,
    category : TransactionCategory,
};
type displayTransactionType = {
    createdAt: string | number | Date;
    paymentFor : string,
    amount : Number,
    paymentMethod : string,
    category : string,
}

const useHandleDash = (debouncedSearchString : string) => {
    
    // for displaying transactions
    const [allTransactions, setallTransactions] = useState<displayTransactionType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handleAddTransaction = async (data : TransactionData) => {
        try {
            const response = await fetch('/api/transactions',
                {
                    method : "POST",
                    headers : { "Content-Type": "application/json" },
                    body : JSON.stringify(data)
                }
            )
            if(!response.ok){
                const errorData = await response.json();
                toast({
                    title : "Error",
                    description : errorData.error || "Something went wrong",
                    variant : "destructive"
                })
            }else{
                toast({
                    title : "Success",
                    description : "Transaction Added Successfully",
                    variant : "default"
                })
                setallTransactions([
                    ...allTransactions,
                    {
                        paymentFor: data.paymentFor,
                        amount: data.amount,
                        category: data.category,
                        paymentMethod: data.paymentMethod,
                        createdAt: Date.now()
                    }
                ])
            }
        } catch (error : any) {
            console.log("Error in Add Transaction hook", error.message);
            toast({
                title : "Error",
                description : error.data,
                variant : "destructive"
            })
        }
    }
    const handleFetchTransactions = useCallback(async (page : number) => {
        try {
            const response = await fetch(`/api/transactions?page=${page}&search=${debouncedSearchString}`);
            if(!response.ok){
                const errorData = await response.json();
                toast({
                    title : "Error",
                    description : errorData.error || "Failed to fetch transactions",
                    variant : "destructive"
                })
            }
            const data = await response.json();
            setallTransactions(data.transactions);
            setCurrentPage(data.currentPage);
            setTotalPages(data.totalPages);
        } catch (error : any) {
            console.log("Internal Server Error occured in Fetch Transactions", error);
            toast({
                title : "Error",
                description : error.message,
                variant : "destructive"
            })
        }
    },[debouncedSearchString, toast])
    return {handleAddTransaction, allTransactions, handleFetchTransactions, currentPage, totalPages};
}

export default useHandleDash
