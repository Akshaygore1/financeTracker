"use client";

import { parseExcel } from "@/lib/utils";
import { ChangeEvent, useEffect, useState } from "react";

const FileUpload: React.FC = () => {
	const [file, setFile] = useState<File | null>(null);

	useEffect(() => {
		if (file) {
			parseExcel(file);
		}
	}, [file]);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];
		if (selectedFile) {
			setFile(selectedFile);
		}
	};

	return (
		<div>
			<input type="file" onChange={handleFileChange} />
			{file && <p>File selected: {file.name}</p>}
		</div>
	);
};

export default FileUpload;
