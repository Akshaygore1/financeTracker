"use client";

import { barGraphData } from "@/types";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export function Barincomechart({
	barGraphData
}: {
	barGraphData: barGraphData[];
}) {
	return (
		<ResponsiveContainer width="100%" height={350}>
			<BarChart data={barGraphData}>
				<XAxis
					dataKey="name"
					stroke="#888888"
					fontSize={12}
					tickLine={false}
					axisLine={false}
				/>
				<YAxis
					stroke="#888888"
					fontSize={12}
					tickLine={false}
					axisLine={false}
					tickFormatter={(value: any) => `$${value}`}
				/>
				<Bar dataKey="total" fill="#fa8b1d" radius={[4, 4, 0, 0]} />
			</BarChart>
		</ResponsiveContainer>
	);
}
