'use client';

import { useQuery } from '@tanstack/react-query';
import { PaymentMethod } from '@prisma/client';
import { FaMoneyBillWave, FaCreditCard, FaWallet, FaCalendarAlt } from 'react-icons/fa';

type Mandate = {
  paymentFor: string;
  amount: number;
  paymentMethod: PaymentMethod;
  repeat: number;
  startDate: string;
};

const getPaymentIcon = (method: PaymentMethod) => {
  switch (method) {
    case 'CASH':
      return <FaMoneyBillWave className="text-green-600 mr-2" />;
    case 'CARD':
      return <FaCreditCard className="text-blue-600 mr-2" />;
    case 'NETBANKING':
      return <FaWallet className="text-purple-600 mr-2" />;
    default:
      return null;
  }
};

const getDateIcon = () => <FaCalendarAlt className="text-gray-500 mr-2" />;

const fetchMandates = async () => {
  const response = await fetch('/api/getMandates');
  if (!response.ok) {
    throw new Error('Failed to fetch mandates');
  }
  const data = await response.json();
  return data.mandates;
};

const MandateTable: React.FC = () => {
  const { data, error, isLoading } = useQuery<Mandate[]>({queryKey: ['get-mandates'], queryFn: fetchMandates, retry: 2});

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="overflow-x-auto rounded-lg  ">
        <h4 className="text-lg text-gray-600 font-semibold mb-4">Recurring Payments Overview</h4>
      <table className="min-w-full text-sm border border-gray-300 rounded-lg text-left text-gray-700">
        <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-4 py-3 border">Payment For</th>
            <th className="px-4 py-3 border">Amount</th>
            <th className="px-4 py-3 border">Payment Method</th>
            <th className="px-4 py-3 border">Repeat (Days)</th>
            <th className="px-4 py-3 border">Start Date</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((mandate, idx) => (
            <tr
              key={idx}
              className="border-t hover:bg-gray-50 transition duration-150 ease-in-out"
            >
              <td className="px-4 py-2 font-medium">{mandate.paymentFor}</td>
              <td className="px-4 py-2 text-green-700 font-semibold">
                ₹{mandate.amount.toLocaleString()}
              </td>
              <td className="px-4 py-2">
                <div className="flex items-center">
                  {getPaymentIcon(mandate.paymentMethod)}
                  <span>{mandate.paymentMethod}</span>
                </div>
              </td>
              <td className="px-4 py-2">{mandate.repeat} days</td>
              <td className="px-4 py-2">
                <div className="flex items-center">
                  {getDateIcon()}
                  <span>
                    {new Date(mandate.startDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MandateTable;
