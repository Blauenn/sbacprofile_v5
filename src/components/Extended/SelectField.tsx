import { ChangeEvent, SelectHTMLAttributes } from "react";
import { v4 as uuid } from "uuid"
// Functions //
import { handle_input_change } from "../../functions/fields.function";

const field_initial =
	"block px-4 pb-4 pt-4 w-full text-md text-neutral bg-transparent rounded-xl border appearance-none";
const field_focused = "focus:outline-none focus:ring-0 focus:border-primary focus:border";
const field_disabled = "disabled:opacity-50";

const label_initial = "absolute text-md text-neutral duration-150 ease-in-out transform -translate-y-5 scale-90 top-2 z-10 origin-[0] px-2 text-opacity-50";
const label_focused = "peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-5";

interface CurrentComponentProp extends SelectHTMLAttributes<HTMLSelectElement> {
	label: string;
	object?: unknown;
	setObject?: React.SetStateAction<unknown>;
	base_bg?: boolean;
	validation?: string;
	children: React.ReactNode;
}

const SelectField = (props: CurrentComponentProp) => {
	const { label, name, object, setObject, base_bg, children, validation, ...selectProps } = props;

	const uniqueID = uuid();

	return (
		<div className="flex flex-col w-full gap-1">
			<div className="relative">
				<select
					{...selectProps}
					onChange={(event: ChangeEvent<HTMLSelectElement>) => {
						object && setObject
							? handle_input_change(event, object, setObject)
							: selectProps.onChange && selectProps.onChange(event);
					}}
					name={name}
					id={`floating-outlined-${uniqueID}`}
					className={`${field_initial} ${field_focused} ${field_disabled} relative`}
				>
					{children}
				</select>
				<label
					htmlFor={`floating-outlined-${uniqueID}`}
					className={`${label_initial} ${label_focused} ${base_bg ? "bg-base-100" : "bg-white"
						} start-1`}
				>
					{label}
				</label>
				<div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
					<i className="text-sm opacity-50 fa-solid fa-chevron-down me-2"></i>
				</div>
			</div>
			{validation ? (
				<h1 className="text-sm text-red-500">{validation}</h1>
			) : null}
		</div>
	);
};

export default SelectField;
