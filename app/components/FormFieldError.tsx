import { FormState } from "../util";

type FieldErrorProps = {
	state: FormState;
	name: string;
};

export default function FieldError({ state, name }: FieldErrorProps) {
	return <p className="text-red-400">{state.fieldErrors[name]?.[0]}</p>;
}
