import { useEffect } from "react";

interface CurrentComponentProp {
	teacher_status: number;
	head_status: number;
}

const Forms_rolodex_card_approvalIcon = (props: CurrentComponentProp) => {
	const { teacher_status, head_status } = props;

	useEffect(() => { }, [teacher_status, head_status]);

	let icon;
	let color;
	switch (true) {
		case teacher_status === 2 && head_status === 2:
			icon = "fa-solid fa-circle-check";
			color = "text-success";
			break;
		case teacher_status === 3 || head_status === 3:
			icon = "fa-solid fa-pencil";
			color = "text-yellow-500";
			break;
		case teacher_status === 4 || head_status === 4:
			icon = "fa-solid fa-circle-xmark";
			color = "text-error";
			break;
		default:
			icon = "fa-solid fa-circle-question";
			color = "opacity-50";
			break;
	}

	return (
		<div className="items-center justify-center hidden sm:flex">
			<i className={`text-2xl ${color} ${icon}`}></i>
		</div>
	);
};

export default Forms_rolodex_card_approvalIcon;