import Link from "next/link";
import React from "react";

const Home = () => {
	return (
		<div className="flex items-center justify-center h-screen text-center">
			<div>
				<p>This is Home</p>
				<Link href="/dashboard">
					<div className="text-blue-500">Go to Dashboard</div>
				</Link>
			</div>
		</div>
	);
};

export default Home;
