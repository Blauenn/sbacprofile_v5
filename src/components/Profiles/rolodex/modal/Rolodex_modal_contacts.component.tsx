import { useState } from "react";
import { useTranslation } from "react-i18next";
// Functions //
import { handle_copy } from "../../../../functions/copy.function";
// Constants //
import { hover_text_color_from_major } from "../../../../constants/styles/colors/color_from_major.constant";
import { Tooltip } from "@mui/material";

interface CurrentComponentProp {
	object: any;
}

const Rolodex_modal_contacts = (props: CurrentComponentProp) => {
	const { object } = props;

	const [copied, setCopied] = useState(false);

	const formattedPhoneNumber = `${object.phone.substring(
		0,
		3
	)}-${object.phone.substring(3, 6)}-${object.phone.substring(6)}`;

	const { t } = useTranslation("profile_rolodex");

	return (
		<div className="flex flex-col">
			<Tooltip
				title={copied ? t("copied_message") : t("clickToCopy_message")}
				placement="top"
				arrow
			>
				<h1
					onClick={() => handle_copy(object.email, setCopied)}
					className={`lg:mb-4 text-lg font-semibold cursor-pointer ${hover_text_color_from_major[object.major]} mb-2 truncate`}>
					<i className="me-4 fa-solid fa-at"></i>
					{object.email}
				</h1>
			</Tooltip>
			{object.phone ? (
				<Tooltip
					title={
						copied ? t("copied_message") : t("clickToCopy_message")
					}
					placement="top"
					arrow
				>
					<h1
						onClick={() => handle_copy(object.phone, setCopied)}
						className={`lg:mb-4 text-lg font-semibold cursor-pointer ${hover_text_color_from_major[object.major]} mb-2`}>
						<i className="me-4 fa-solid fa-phone"></i>
						{object.phone ? `${formattedPhoneNumber}` : "Not Given"}
					</h1>
				</Tooltip>
			) : null}
			{object.line_ID ? (
				<Tooltip
					title={copied ? t("copied_message") : t("clickToCopy_message")}
					placement="top"
					arrow>
					<h1
						onClick={() => handle_copy(object.line_ID, setCopied)}
						className={`lg:mb-4 text-lg font-semibold cursor-pointer ${hover_text_color_from_major[object.major]}`}>
						<i className="me-4 fa-brands fa-line"></i>
						{object.line_ID ? object.line_ID.toLowerCase() : "Not Given"}
					</h1>
				</Tooltip>
			) : null}
		</div>
	);
};

export default Rolodex_modal_contacts;
