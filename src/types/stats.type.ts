interface CategoryDivision {
    _sum: {
        amount: number | null;
    };
    category: string;
}

interface PaymentMethodDivision {
    _sum: {
        amount: number | null;
    };
    paymentMethod: string;
}

interface TotalAmount {
    _sum: {
        amount: number | null;
    };
}

interface DatewiseSum {
    [key: string]: number;
}

export interface statsResponse {
        categoryDivisions: CategoryDivision[];
        paymentMethodDivisions: PaymentMethodDivision[];
        totalAmount: TotalAmount;
        lastMonth: DatewiseSum;
        lastWeek: DatewiseSum;
}
