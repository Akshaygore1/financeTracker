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
	getTrasactionalData,
} from "@/lib/utils";
import { redirect } from "next/navigation";
import { TransactionType } from "@/types";

type FinanCialData = TransactionType[];

export default function Dashboard() {
	const financialData: FinanCialData[] = useDataStore(
		(state) => state.financialData
	);
	if (!financialData[0] || financialData[0]?.length === 0) {
		redirect("/");
	}
	const cardData = getCardsData(financialData[0]);
	const barData = getBarGraphData(financialData[0]);
	const pieData = getPieData(financialData[0]);
	const { depositArray, withdrawalArray } = getTrasactionalData(
		financialData[0]
	);
	return (
		<main>
			<Analyticscards cardData={cardData} />
			<Chartscontainer barData={barData} pieData={pieData} />
			<RecentDataContainer
				depositArray={depositArray}
				withdrawalArray={withdrawalArray}
			/>
		</main>
	);
}
