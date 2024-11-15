import { PaymentMethod, TransactionCategory } from "@prisma/client";
import { useState } from "react";
import { toast } from "./use-toast";

const useHandleDash = () => {
    type TransactionData = {
        paymentFor : string,
        amount : Number,
        paymentMethod : PaymentMethod,
        category : TransactionCategory,
    };
    // for displaying transactions
    const [data, setData] = useState({
        paymentFor : "",
        amount : 0,
        paymentMethod : PaymentMethod,
        category : TransactionCategory
      });

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
                toast({
                    title : "Error",
                    description : "OOPS!! An error occured. Please Try again later",
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
    return handleAddTransaction;
}

export default useHandleDash
