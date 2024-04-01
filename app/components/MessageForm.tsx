import { revalidatePath } from "next/cache";

export default function MessageForm() {
	return (
		<form className="flex flex-col w-96 gap-4" action={submitMessageForm}>
			<h2>New Message</h2>
			<label htmlFor="name" className="text-neutral-400">
				Name
			</label>
			<input
				type="text"
				id="name"
				name="name"
				required
				minLength={3}
				className="h-8 px-2 border border-neutral-700"
			/>

			<label htmlFor="content" className="text-neutral-400">
				Message
			</label>
			<textarea
				id="content"
				name="content"
				required
				minLength={3}
				className="h-24 px-2 pt-2 border border-neutral-700"
			/>

			<button
				type="submit"
				className="h-8 border text-neutral-800 bg-neutral-100 border-neutral-700"
			>
				Send
			</button>
		</form>
	);
}

async function submitMessageForm(formData: FormData) {
	"use server";

	await postMessage({
		content: formData.get("content"),
		name: formData.get("name"),
	});

	revalidatePath("/");
}
