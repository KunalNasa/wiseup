import { PaymentMethod, TransactionCategory } from "@prisma/client";

type Transaction = {
  paymentFor: string;
  amount: number;
  paymentMethod: PaymentMethod;
  category: TransactionCategory;
  createdAt: string;
};

const TransactionCard: React.FC<{ transaction: Transaction }> = ({ transaction }) => (
  <div className="p-4 my-1 bg-white border rounded-md shadow-sm hover:shadow-lg transition">
    <div className="flex justify-between">
      <div className="font-semibold text-lg text-gray-800">{transaction.paymentFor}</div>
      <div className="text-sm text-gray-500">{transaction.paymentMethod}</div>
    </div>
    <div className="mt-2 text-gray-600">
      <span className="font-medium">Amount: </span>₹{transaction.amount}
    </div>
    <div className="mt-2 text-gray-600">
      <span className="font-medium">Category: </span>{transaction.category}
    </div>
    <div className="mt-2 text-gray-600">
      <span className="font-medium">On: </span>{new Date(transaction.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })}
    </div>
  </div>
);

export default TransactionCard;
