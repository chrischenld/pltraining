import { getMessages } from "../actions";
import { sql } from "@vercel/postgres";

export default async function MessageList() {
	const messages = await getMessages();

	return (
		<ul>
			{messages.map((message) => (
				<li key={message.id}>{message.text}</li>
			))}
		</ul>
	);
}
