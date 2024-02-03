import { pieChartData } from "@/types";
import React from "react";
import {
	Area,
	AreaChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from "recharts";

const customColors = ["#3498db", "#2ecc71"]; // Better color choices

export default function FinancialAreaChart({
	pieData
}: {
	pieData: pieChartData[];
}) {
	return (
		<ResponsiveContainer width="100%" height={350}>
			<AreaChart
				width={500}
				height={200}
				data={pieData}
				syncId="anyId"
				margin={{
					top: 10,
					right: 30,
					left: 0,
					bottom: 0
				}}
			>
				<CartesianGrid strokeDasharray="1 1" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Area
					type="monotone"
					dataKey="expense"
					stroke={customColors[0]}
					fill={customColors[0]}
				/>
				<Area
					type="monotone"
					dataKey="revenue"
					stroke={customColors[1]}
					fill={customColors[1]}
				/>
			</AreaChart>
		</ResponsiveContainer>
	);
}
