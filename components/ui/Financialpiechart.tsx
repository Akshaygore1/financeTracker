"use client";

import { barGraphData, pieChartData } from "@/types";
import React from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
const data01 = [
	{ name: "Active Campagins", value: 90 },
	{ name: "Inactive Campagins", value: 25 },
	{ name: "ICPs with no campagins", value: 10 }
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Financialpiechart({
	pieData
}: {
	pieData: pieChartData[];
}) {
	return (
		<ResponsiveContainer width="100%" height={350}>
			<PieChart>
				<Pie
					data={data01}
					dataKey="value"
					cx={200}
					cy={200}
					// innerRadius={80}
					height={10}
					outerRadius={100}
				>
					{data01.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
			</PieChart>
		</ResponsiveContainer>
	);
}
