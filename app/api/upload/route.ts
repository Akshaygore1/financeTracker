import { parseExcel } from "@/lib/utils";
import type { NextApiRequest, NextApiResponse } from "next";
const XLSX = require("xlsx");
const fs = require("fs");

export async function POST(req: NextApiRequest, res: NextApiResponse) {
	let parsedExcelData = parseExcel(req.body);
	console.log("parsedExcelData", parsedExcelData);
	console.log(req.body);
}
