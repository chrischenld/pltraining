"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { fromErrorToFormState, toFormState } from "./util";
import { FormState } from "./util";

type Message = {
	id: string;
	text: string;
};

let messages: Message[] = [
	{
		id: crypto.randomUUID(),
		text: "First Message",
	},
	{
		id: crypto.randomUUID(),
		text: "Second Message",
	},
	{
		id: crypto.randomUUID(),
		text: "Third Message",
	},
];

export async function getMessages(): Promise<Message[]> {
	await new Promise((resolve) => setTimeout(resolve, 1));
	return Promise.resolve(messages);
}

const createMessageSchema = z.object({
	title: z.string().min(1).max(191),
	text: z.string().min(1).max(191),
});

export async function createMessage(state: FormState, formData: FormData) {
	// Timed delay to simulate latency
	await new Promise((resolve) => setTimeout(resolve, 32));

	try {
		const data = createMessageSchema.parse({
			title: formData.get("title"),
			text: formData.get("text"),
		});

		messages.push({
			id: crypto.randomUUID(),
			...data,
		});

		revalidatePath("/");

		return toFormState("SUCCESS", "Message Created");
		// return {
		// 	message: `Message "${data.title}" that reads "${data.text}" created`,
		// };
	} catch (error) {
		return fromErrorToFormState;
	}
}
