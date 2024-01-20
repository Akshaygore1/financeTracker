import React, { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "./ui/Card";
import Transaction from "./ui/Transaction";
import { TransactionType } from "@/types";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from "./ui/pagination";

const ITEMS_PER_PAGE = 5; // Adjust the number of items per page as needed

export default function RecentDataContainer({
	depositArray,
	withdrawalArray
}: {
	depositArray: TransactionType[];
	withdrawalArray: TransactionType[];
}) {
	const [depositPage, setDepositPage] = useState(1);
	const [withdrawalPage, setWithdrawalPage] = useState(1);

	const depositTotalPages = Math.ceil(depositArray.length / ITEMS_PER_PAGE);
	const withdrawalTotalPages = Math.ceil(
		withdrawalArray.length / ITEMS_PER_PAGE
	);

	const renderTransactions = (
		transactions: TransactionType[],
		currentPage: number
	) => {
		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
		const endIndex = startIndex + ITEMS_PER_PAGE;
		const currentTransactions = transactions.slice(startIndex, endIndex);

		return currentTransactions.map((transaction, index) => (
			<Transaction key={index} transaction={transaction} />
		));
	};

	const handleDepositPageChange = (page: number) => {
		setDepositPage(page);
	};

	const handleWithdrawalPageChange = (page: number) => {
		setWithdrawalPage(page);
	};

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 p-4">
			<Card className="flex-1">
				<CardHeader>
					<CardTitle>Recent Deposits</CardTitle>
					<CardDescription>
						You Have {depositArray.length} transactions{" "}
					</CardDescription>
				</CardHeader>
				<CardContent className="pl-2">
					{renderTransactions(depositArray, depositPage)}
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									href="#"
									onClick={() =>
										handleDepositPageChange(Math.max(depositPage - 1, 1))
									}
									// disabled={depositPage === 1}
								/>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink
									href="#"
									onClick={() => handleDepositPageChange(1)}
								>
									{depositPage}
								</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationNext
									href="#"
									onClick={() =>
										handleDepositPageChange(
											Math.min(depositPage + 1, depositTotalPages)
										)
									}
									// disabled={depositPage === depositTotalPages}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</CardContent>
			</Card>
			<Card className="flex-1 mt-4 md:mt-0">
				<CardHeader>
					<CardTitle>Recent Credits</CardTitle>
					<CardDescription>
						You Have {withdrawalArray.length} transactions
					</CardDescription>
				</CardHeader>
				<CardContent className="pl-2">
					{renderTransactions(withdrawalArray, withdrawalPage)}
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									href="#"
									onClick={() =>
										handleWithdrawalPageChange(Math.max(withdrawalPage - 1, 1))
									}
									// disabled={withdrawalPage === 1}
								/>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink
									href="#"
									onClick={() => handleWithdrawalPageChange(1)}
								>
									{withdrawalPage}
								</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationNext
									href="#"
									onClick={() =>
										handleWithdrawalPageChange(
											Math.min(withdrawalPage + 1, withdrawalTotalPages)
										)
									}
									// disabled={withdrawalPage === withdrawalTotalPages}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</CardContent>
			</Card>
		</div>
	);
}
