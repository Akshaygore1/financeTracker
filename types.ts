export interface analyticsCard {
	title: string;
	amount: string;
	percentageChange: string;
}
export interface barGraphData {
	name: string;
	revenue: number;
	expense: number;
}
export interface pieChartData {
	category: string;
	expense: number;
	revenue: number;
}
export interface ExcelRow {
	Date: string;
}

export interface Finance {
	Date: string;
	Narration: string;
	"Chq./Ref.No.": string;
	"Value Dt": string;
	"Withdrawal Amt.": number | null;
	"Closing Balance": number;
	"Deposit Amt.": number | null;
}

export interface TransactionType {
	accountBalance: number;
	name: string;
	upiId: string | null;
	depositAmount: number | null;
	withdrawalAmount: number | null;
	date: string;
	month: string;
	year: number;
	category: string;
}

export interface TransactionalData {
	depositArray: TransactionType[];
	withdrawalArray: TransactionType[];
}

export interface graphData {
	name: string;
	expense: number;
	revenue: number;
}
