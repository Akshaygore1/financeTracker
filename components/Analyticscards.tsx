import { analyticsCard } from "@/types";
import { Analyticscard } from "./ui/Analyticscard";

export const Analyticscards = ({ cardData }: { cardData: analyticsCard[] }) => {
	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-4 ">
			{cardData?.length &&
				cardData.map((card, index) => (
					<Analyticscard key={index} cardInputs={card} />
				))}
		</div>
	);
};
