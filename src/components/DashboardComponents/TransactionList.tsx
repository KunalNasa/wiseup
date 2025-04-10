import TransactionCard from "./TransactionCard";

type TransactionsListProps = {
  transactions: any[];
};

const TransactionsList: React.FC<TransactionsListProps> = ({ transactions }) => {
  if (transactions.length === 0) {
    return <div className="font-semibold text-gray-500 min-h-[50vh]">No Transactions matched with search string</div>;
  }

  return (
    <div className="min-h-[50vh]">
      {transactions.map((txn, idx) => (
        <TransactionCard key={idx} transaction={txn} />
      ))}
    </div>
  );
};

export default TransactionsList;
