import { formatter } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { TransactionType } from "@/types";

export default function Transaction({
	transaction
}: {
	transaction: TransactionType;
}) {
	const isDeposit = transaction.depositAmount !== null;
	const amount = isDeposit
		? transaction.depositAmount
		: transaction.withdrawalAmount;

	return (
		<div className="flex items-center p-4">
			<Avatar className="h-9 w-9">
				<AvatarImage src="/avatars/01.png" alt="Avatar" />
				<AvatarFallback>
					{transaction.name.charAt(0).toUpperCase()}
				</AvatarFallback>
			</Avatar>
			<div className="ml-4 space-y-1 max-w-md">
				<p className="text-sm font-medium leading-none overflow-hidden whitespace-nowrap overflow-ellipsis">
					{transaction.name}
				</p>
				<p className="text-sm text-muted-foreground">{transaction.category}</p>
			</div>
			<div className="ml-auto font-medium">
				{amount !== null && formatter.format(amount)}
			</div>
		</div>
	);
}
