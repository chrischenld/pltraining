"use client";

import React, { useState, useEffect } from "react";
import Input from "./Input";

interface NumberInputProps {
	label: string;
	initialValue?: number;
}

export default function NumberInput({
	label,
	initialValue,
	...props
}: NumberInputProps): JSX.Element {
	return <Input type="number" label={label} value={initialValue} {...props} />;
}
