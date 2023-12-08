import { Analyticscards } from "@/components/Analyticscards";
import { Chartscontainer } from "@/components/Chartscontainer";
import { Navbar } from "@/components/Navbar";
import RecentDataContainer from "@/components/RecentDataContainer";
import { getBarGraphData, getCardsData, getPieData } from "@/lib/utils";

export default function Dashboard() {
	const cardData = getCardsData();
	const barData = getBarGraphData();
	const pieData = getPieData();
	return (
		<main>
			<Navbar />
			<Analyticscards cardData={cardData} />
			<Chartscontainer barData={barData} pieData={pieData} />
			<RecentDataContainer />
		</main>
	);
}
