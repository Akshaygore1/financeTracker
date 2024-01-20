"use client";
import { Analyticscards } from "@/components/Analyticscards";
import { Chartscontainer } from "@/components/Chartscontainer";
import { Navbar } from "@/components/Navbar";
import RecentDataContainer from "@/components/RecentDataContainer";
import useDataStore from "@/hooks/dataStore";
import {
	getBarGraphData,
	getCardsData,
	getPieData,
	getTrasactionalData
} from "@/lib/utils";
import { redirect } from "next/navigation";

export default function Dashboard() {
	const financialData = useDataStore((state) => state.financialData);
	if (financialData.length === 0) {
		redirect("/");
	}
	const cardData = getCardsData(financialData[0]);
	const barData = getBarGraphData();
	const pieData = getPieData();
	const { depositArray, withdrawalArray } = getTrasactionalData(
		financialData[0]
	);
	return (
		<main>
			<Navbar />
			<Analyticscards cardData={cardData} />
			{/* <Chartscontainer barData={barData} pieData={pieData} /> */}
			<RecentDataContainer
				depositArray={depositArray}
				withdrawalArray={withdrawalArray}
			/>
		</main>
	);
}
