import React, { TextareaHTMLAttributes } from "react";
import { handle_input_change } from "../../functions/fields.function";

const field_initial = "block px-4 pb-4 pt-4 w-full text-md text-neutral bg-transparent rounded-xl border appearance-none";
const field_focused = "focus:outline-none focus:ring-0 focus:border-primary focus:border";

const label_initial = "absolute text-md text-neutral duration-150 ease-in-out transform -translate-y-5 scale-90 top-2 z-10 origin-[0] px-2 text-opacity-50";
const label_focused = "peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-5";

interface CurrentComponentProp extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label: string;
	object: unknown;
	setObject: React.SetStateAction<unknown>;
	base_bg?: boolean;
	validation?: string;
	maxRows?: number;
}

const TextArea = (props: CurrentComponentProp) => {
	const { label, name, object, setObject, base_bg, validation, maxRows, ...inputProps } = props;

	return (
		<div className="flex flex-col gap-1">
			<div className="w-full">
				<div className="relative">
					<textarea
						{...inputProps}
						onChange={(event) => {
							handle_input_change(event, object, setObject);
						}}
						name={name}
						id="floating_outlined"
						className={`${field_initial} ${field_focused} peer`}
						placeholder=" "
						rows={maxRows || 1}
					/>
					<label
						htmlFor="floating_outlined"
						className={`${label_initial} ${label_focused} ${base_bg ? "bg-base-100" : "bg-white"} start-1`}
					>
						{label}
					</label>
				</div>
			</div>
			{validation ? <h1 className="text-sm text-red-500">{validation}</h1> : null}
		</div>
	);
};

export default TextArea;
