"use client";

import { Session } from "@/app/types";

interface NewSessionFormProps {
	sessionData: Session;
}

export default function NewSessionForm({ sessionData }: NewSessionFormProps) {
	// Use sessionData to pre-fill the form
	return (
		<form className="grid grid-cols-subgrid col-span-full">
			{/* Your form fields here */}
			<p className="col-span-full">Session ID: {sessionData.session_id}</p>
			{/* ... */}
		</form>
	);
}
