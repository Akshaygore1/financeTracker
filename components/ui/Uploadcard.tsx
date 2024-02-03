"use client";

import { parseExcel } from "@/lib/utils";
import { ChangeEvent, useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./Card";
import { Input } from "./input";

const FileUpload: React.FC = () => {
	const [file, setFile] = useState<File | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		if (file) {
			parseExcel(file);
		}
	}, [file]);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];
		if (selectedFile) {
			if (selectedFile.name.endsWith(".xls")) {
				setFile(selectedFile);
				setErrorMessage(null);
			} else {
				setFile(null);
				setErrorMessage("Invalid file format. Please choose an .xls file.");
			}
		}
	};

	return (
		<div>
			<Card className="flex-1">
				<CardHeader>
					<CardTitle>File Upload (.xls)</CardTitle>
					<CardDescription>Choose an .xls file to upload</CardDescription>
				</CardHeader>
				<CardContent className="pl-2"></CardContent>
				<Input type="file" accept=".xls" onChange={handleFileChange} />
				{errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
				{file && <p>Selected File: {file.name}</p>}
			</Card>
		</div>
	);
};

export default FileUpload;
