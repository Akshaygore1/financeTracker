"use client";

import { barGraphData } from "@/types";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from "recharts";

export function Barincomechart({
	barGraphData
}: {
	barGraphData: barGraphData[];
}) {
	return (
		<ResponsiveContainer width="100%" height={350}>
			<BarChart
				width={500}
				height={300}
				data={barGraphData}
				margin={{
					top: 20,
					right: 30,
					left: 20,
					bottom: 5
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="expense" stackId="a" fill="#8884d8" />
				<Bar dataKey="revenue" stackId="a" fill="#82ca9d" />
			</BarChart>
		</ResponsiveContainer>
	);
}
