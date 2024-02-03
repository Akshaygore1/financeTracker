import React, { useState } from "react";

import { TransactionType } from "@/types";
import Transaction from "./Transaction";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./Card";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "./pagination";

const ITEMS_PER_PAGE = 5;

interface TransactionTableProps {
	transactions: TransactionType[];
	title: string;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
	transactions,
	title,
}) => {
	const [page, setPage] = useState(1);
	const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);

	const renderTransactions = (currentPage: number) => {
		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
		const endIndex = startIndex + ITEMS_PER_PAGE;
		const currentTransactions = transactions.slice(startIndex, endIndex);

		return currentTransactions.map((transaction, index) => (
			<Transaction key={index} transaction={transaction} />
		));
	};

	const handlePageChange = (
		newPage: number,
		event: React.MouseEvent<HTMLAnchorElement>
	) => {
		event.preventDefault();
		setPage(newPage);
	};

	return (
		<Card className="flex-1 mt-4 md:mt-0">
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>
					You Have {transactions.length} transactions
				</CardDescription>
			</CardHeader>
			<CardContent className="pl-2">
				{renderTransactions(page)}
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								onClick={(event) =>
									handlePageChange(Math.max(page - 1, 1), event)
								}
							/>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink>{page}</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationNext
								onClick={(event) =>
									handlePageChange(Math.min(page + 1, totalPages), event)
								}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</CardContent>
		</Card>
	);
};

export default TransactionTable;
