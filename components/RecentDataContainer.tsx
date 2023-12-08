import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "./ui/Card";
import Transaction from "./ui/Transaction";

export default function RecentDataContainer() {
	const transactions = 0;
	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 p-4">
			<Card className="flex-1">
				<CardHeader>
					<CardTitle>Recent Deposits</CardTitle>
					<CardDescription>
						You Have {transactions} transactions{" "}
					</CardDescription>
				</CardHeader>
				<CardContent className="pl-2">
					<Transaction />
				</CardContent>
			</Card>
			<Card className="flex-1 mt-4 md:mt-0">
				<CardHeader>
					<CardTitle>Recent Credits</CardTitle>
					<CardDescription>
						You Have {transactions} transactions
					</CardDescription>
				</CardHeader>
				<CardContent className="pl-2">
					<Transaction />
				</CardContent>
			</Card>
		</div>
	);
}
