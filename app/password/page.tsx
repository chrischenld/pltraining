"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
	const [password, setPassword] = useState("");
	const [passwordIncorrect, setPasswordIncorrect] = useState(false);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		const requestPage = new URLSearchParams(window.location.search).get(
			"requestPage"
		);
		const request = await fetch(`/api`, {
			body: JSON.stringify({ password }),
			headers: { "Content-Type": "application/json" },
			method: "post",
			credentials: "include", // Include credentials (cookies) with the request
		});

		if (request.status !== 200) {
			setPasswordIncorrect(true);
			setLoading(false);
		} else {
			router.replace(requestPage || "/");
		}
	};

	return (
		<main className="min-h-screen flex flex-col justify-center items-center">
			<div className="w-72">
				<form onSubmit={onSubmit} className="flex flex-col gap-3">
					<label htmlFor="password">password</label>
					<div className="flex gap-2">
						<input
							type="text"
							id="password"
							value={password}
							className="bg-neutral-700 border border-neutral-600 rounded-xs text-neutral-100 h-8 px-2"
							onChange={(e) => setPassword(e.target.value)}
							autoFocus
						/>
						<button
							type="submit"
							className="w-fit text-left h-8 px-3 text-neutral-100"
						>
							→
						</button>
					</div>
					{!passwordIncorrect && (
						<p className="text-neutral-500">this project is locked</p>
					)}
					{passwordIncorrect && <p className="text-red-600">wrong password</p>}
				</form>
			</div>
		</main>
	);
}
