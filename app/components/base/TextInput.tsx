import Input from "./Input";

interface TextInputProps {
	label: string;
	// Add any text-specific props here
}

export default function TextInput({
	label,
	...props
}: TextInputProps): JSX.Element {
	return <Input type="text" label={label} {...props} />;
}
