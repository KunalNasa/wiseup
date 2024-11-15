import { PaymentMethod, TransactionCategory } from "@prisma/client";
import { useCallback, useState } from "react";
import { toast } from "./use-toast";


const useHandleDash = (debouncedSearchString : string) => {
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
    // for displaying transactions
    const [allTransactions, setallTransactions] = useState<displayTransactionType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handleAddTransaction = async (data : TransactionData) => {
        console.log(JSON.stringify(data));
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
            console.log(data);
            setallTransactions(data.transactions);
            console.log(allTransactions);
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
