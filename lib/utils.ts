import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getCardsData() {
	const dummyData = [
		{
			title: "Total Revenue",
			amount: "$45,231.89",
			percentageChange: "+20.1% from last month"
		},
		{
			title: "Monthly Expenses",
			amount: "$12,345.67",
			percentageChange: "-5.8% from last month"
		},
		{
			title: "Net Profit",
			amount: "$32,886.22",
			percentageChange: "+15.2% from last month"
		}
	];

	return dummyData;
}

export function getBarGraphData() {
	const data = [
		{
			name: "Jan",
			total: Math.floor(Math.random() * 5000) + 1000
		},
		{
			name: "Feb",
			total: Math.floor(Math.random() * 5000) + 1000
		},
		{
			name: "Mar",
			total: Math.floor(Math.random() * 5000) + 1000
		},
		{
			name: "Apr",
			total: Math.floor(Math.random() * 5000) + 1000
		}
	];
	return data;
}

export function getPieData() {
	const expensesData = [
		{ category: "Rent", amount: 1200 },
		{ category: "Utilities", amount: 200 },
		{ category: "Groceries", amount: 300 },
		{ category: "Entertainment", amount: 150 },
		{ category: "Dining Out", amount: 100 },
		{ category: "Transportation", amount: 50 }
	];
	return expensesData;
}
