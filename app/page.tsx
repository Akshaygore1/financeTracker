"use client";
import Uploadcard from "@/components/ui/Uploadcard";
import useDataStore from "@/hooks/dataStore";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const Home = () => {
	const financialData = useDataStore((state) => state.financialData);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
		useDataStore.getState().clearTransaction();
	}, []);

	if (!isMounted) {
		return null;
	}
	if (financialData.length > 0) {
		redirect("/dashboard");
	}

	return (
		<div className="flex items-center justify-center h-screen text-center">
			<Uploadcard />
		</div>
	);
};

export default Home;
