// File: pages/api/tryFirebaseAdmin.js
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "@/config/fireadmin";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// res.status(200).json({ name: "John Doe" });
	const firebase = admin.database();
	var db = admin.database();
	var ref = db.ref();
	ref.once("value", function (snapshot: { val: () => any }) {
		res.status(200).json(snapshot);
	});

	// Return promise to handle serverless function timeouts
}
