"use client";

import { Session } from "@/app/types";

interface NewSessionFormProps {
	sessionData: Session;
}

export default function NewSessionForm({ sessionData }: NewSessionFormProps) {
	// Use sessionData to pre-fill the form
	return (
		<form>
			{/* Your form fields here */}
			<p>Session ID: {sessionData.session_id}</p>
			{/* ... */}
		</form>
	);
}
