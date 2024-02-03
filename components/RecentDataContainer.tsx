import React from "react";
import { TransactionType } from "@/types";
import TransactionTable from "./ui/Transactiontable";

export default function RecentDataContainer({
	depositArray,
	withdrawalArray,
}: {
	depositArray: TransactionType[];
	withdrawalArray: TransactionType[];
}) {
	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 p-4">
			<TransactionTable transactions={depositArray} title="Recent Deposits" />
			<TransactionTable transactions={withdrawalArray} title="Recent Credits" />
		</div>
	);
}
