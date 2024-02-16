import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import { getLocalData } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "My Finance",
	description: "Finance App For Yourself",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// let getData = getLocalData();
	// console.log("getData", getData);
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
