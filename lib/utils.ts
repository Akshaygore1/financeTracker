import useDataStore from "@/hooks/dataStore";
import {
	ExcelRow,
	Finance,
	TransactionType,
	TransactionalData,
	barGraphData,
	graphData,
} from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as XLSX from "xlsx";

export const formatter = new Intl.NumberFormat("en-IN", {
	style: "currency",
	currency: "INR",
});

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getCardsData(financialData: TransactionType[]) {
	// console.log(financialData);
	let currentBalance: number =
		financialData[financialData.length - 1].accountBalance;
	let totalExpense: number = 0;
	let totalIncome: number = 0;
	for (const i of financialData) {
		// console.log(i);
		totalExpense += i.withdrawalAmount ? i.withdrawalAmount : 0;
		totalIncome += i.depositAmount ? i.depositAmount : 0;
	}
	const dummyData = [
		{
			title: "Current Balance",
			amount: formatter.format(currentBalance),
			percentageChange: "+20.1% from last month",
		},
		{
			title: "Total Expense",
			amount: formatter.format(totalExpense),
			percentageChange: "-5.8% from last month",
		},
		{
			title: "Total Income",
			amount: formatter.format(totalIncome),
			percentageChange: "+15.2% from last month",
		},
	];

	return dummyData;
}

export function getBarGraphData(financeData: TransactionType[]) {
	let barData: barGraphData[] = [];
	const obj: any = {};
	const data: graphData[] = [];
	for (const transaction of financeData) {
		if (!obj[transaction.month]) {
			obj[transaction.month] = {
				expense: transaction.withdrawalAmount,
				revenue: transaction.depositAmount,
			};
		} else {
			obj[transaction.month].expense += transaction.withdrawalAmount;
			obj[transaction.month].revenue += transaction.depositAmount;
			obj[transaction.month].name = transaction.month;
		}
	}
	for (const key in obj) {
		data.push(obj[key]);
	}
	return data;
}

export function getPieData(financeData: TransactionType[]) {
	const data = financeData.map((transaction: TransactionType) => {
		return {
			category: transaction.category, // Change "name" to "category" or any other desired property
			expense: transaction.withdrawalAmount ? transaction.withdrawalAmount : 0,
			revenue: transaction.depositAmount ? transaction.depositAmount : 0,
		};
	});

	console.log(data);
	return data;
}

export const parseExcel = (file: File) => {
	if (file) {
		let processedFinancialData: TransactionType[] = [];
		const reader = new FileReader();

		reader.onload = (e: ProgressEvent<FileReader>) => {
			const data = e.target?.result as ArrayBuffer | null;

			if (data) {
				const workbook = XLSX.read(new Uint8Array(data), { type: "array" });

				// Assuming the first sheet is the one you want to parse
				const sheetName = workbook.SheetNames[0];
				const sheet = workbook.Sheets[sheetName];

				// Parse the sheet into a JSON object
				const rawSheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
				const headerRowsToRemove = 20;
				const sheetData: ExcelRow[][] = rawSheetData.slice(
					headerRowsToRemove
				) as ExcelRow[][];
				const jsonData: Finance[] = XLSX.utils.sheet_to_json(
					XLSX.utils.aoa_to_sheet(sheetData)
				);

				const dateRegex = /^\d{2}\/\d{2}\/\d{2}$/;
				const filteredFinancialData = jsonData.filter((row) => {
					if (row.Date) {
						const dateValue = String(row.Date).trim();
						return dateValue.match(dateRegex);
					}
					return false;
				});
				for (const i of filteredFinancialData) {
					let transaction: Finance = i;
					const { depositAmount, withdrawalAmount } =
						processTransaction(transaction);
					const name = extractName(transaction);
					const upiId = extractUpiId(transaction);
					const accountBalance = transaction["Closing Balance"];
					const date = transaction["Date"];
					const { monthName, currentYear } = extractDate(date);
					const category = findTransactionCategory(name);

					const transactionObject = {
						accountBalance,
						name,
						upiId,
						depositAmount,
						withdrawalAmount,
						date,
						month: monthName,
						year: currentYear,
						category,
					};
					processedFinancialData.push(transactionObject);
				}
			}
			useDataStore.getState().addTransaction(processedFinancialData);
		};
		reader.readAsArrayBuffer(file);
	}
};

function processTransaction(transaction: Finance) {
	let depositAmount = null;
	let withdrawalAmount = null;

	if (transaction["Deposit Amt."]) {
		depositAmount = Math.round(transaction["Deposit Amt."]);
	}

	if (transaction["Withdrawal Amt."]) {
		withdrawalAmount = Math.round(transaction["Withdrawal Amt."]);
	}

	return { depositAmount, withdrawalAmount };
}

function extractName(transaction: Finance) {
	const upiMatch = transaction.Narration.match(/UPI-(.*?)-/);
	return upiMatch ? upiMatch[1] : transaction.Narration;
}

function extractUpiId(transaction: Finance) {
	const emailMatch = transaction.Narration.match(/[a-zA-Z\d]+@[^-]+/);
	return emailMatch ? emailMatch[0] : null;
}

function extractDate(dataString: string) {
	const [day, month, year] = dataString.split("/").map(Number);
	const parsedDate = new Date(2000 + year, month - 1, day);
	const extractedMonth = parsedDate.getMonth() + 1;
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const adjustedMonthNumber = Math.max(1, Math.min(12, extractedMonth));
	const monthName = monthNames[adjustedMonthNumber - 1];
	const currentYear = 2000 + year;

	return { monthName, currentYear };
}
function findTransactionCategory(transaction: string): string {
	const keywordsToCategory = {
		grocery: ["grocery", "supermarket", "mart"],
		utilities: ["electricity", "water", "gas"],
		shopping: ["mall", "store", "shop", "wear", "flipkart", "amazon"],
		dining: ["restaurant", "food", "cafe"],
		transportation: ["transport", "fuel", "gas"],
		entertainment: ["movie", "concert", "game"],
		health: ["hospital", "pharmacy", "doctor"],
		rent: ["rent", "lease", "landlord"],
		salary: ["salary", "income", "paycheck"],
		food: [
			"food",
			"grocery",
			"restaurant",
			"dining",
			"swiggy",
			"zomato",
			"bakery",
		],
		other: ["miscellaneous", "general"],
	};

	const lowercasedNarration = transaction.toLowerCase();

	const foundCategory = Object.entries(keywordsToCategory).find(
		([category, keywords]) =>
			keywords.some((keyword) => lowercasedNarration.includes(keyword))
	);

	return foundCategory ? foundCategory[0] : "uncategorized";
}

export function getTrasactionalData(
	financialData: TransactionType[]
): TransactionalData {
	let depositArray: TransactionType[] = [];
	let withdrawalArray: TransactionType[] = [];
	for (const i of financialData) {
		if (i.depositAmount) {
			depositArray.push(i);
		}
		if (i.withdrawalAmount) {
			withdrawalArray.push(i);
		}
	}
	return { depositArray, withdrawalArray };
}
