"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Barincomechart } from "./ui/Barchart";
import { barGraphData, pieChartData } from "@/types";
import Financialpiechart from "./ui/FinancialAreaChart";
import FinancialAreaChart from "./ui/FinancialAreaChart";

export const Chartscontainer = ({
	barData,
	pieData
}: {
	barData: barGraphData[];
	pieData: pieChartData[];
}) => {
	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 p-4">
			<Card className="flex-1 mt-4 md:mt-0">
				<CardHeader>
					<CardTitle>Bar Chart</CardTitle>
				</CardHeader>
				<CardContent className="pl-2">
					<Barincomechart barGraphData={barData} />
				</CardContent>
			</Card>
			<Card className="flex-1 mt-4 md:mt-0">
				<CardHeader>
					<CardTitle>Pie Chart</CardTitle>
				</CardHeader>
				<CardContent className="pl-2">
					<FinancialAreaChart pieData={pieData} />
				</CardContent>
			</Card>
		</div>
	);
};
