import { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { Tooltip } from "@mui/material";
// Functions //
import { handle_copy } from "../../../../functions/copy.function";
// Constants //
import { hover_text_color_from_major } from "../../../../constants/styles/colors/color_from_major.constant";
import { hover_transition } from "../../../../constants/styles/transition.style";

interface CurrentComponentProp {
	object: any;
}


const Rolodex_modal_names = (props: CurrentComponentProp) => {
	const { object } = props;

	const [copied, setCopied] = useState(false);

	const text_styles = `${hover_text_color_from_major[object.major]} ${hover_transition} cursor-pointer`;

	const full_name_english = `${object.first_name} ${object.last_name}`;
	const full_name_thai = `${object.first_name_thai} ${object.last_name_thai}`;

	const { t } = useTranslation("profile_rolodex");

	return (
		<div className="w-[200px] sm:w-full">
			{i18n.language === "th" ? (
				<>
					<Tooltip
						title={copied ? t("copied_message") : t("clickToCopy_message")}
						placement="top"
						arrow
					>
						<h1 className={`mb-2 text-2xl font-semibold line-clamp-4 ${text_styles}`} onClick={() => handle_copy(full_name_thai, setCopied)}>
							{full_name_thai}
						</h1>
					</Tooltip>
					<Tooltip
						title={copied ? t("copied_message") : t("clickToCopy_message")}
						placement="top"
						arrow
					>
						<h1 className={`text-xl ${text_styles}`} onClick={() => handle_copy(full_name_english, setCopied)}>
							{full_name_english}
						</h1>
					</Tooltip>
				</>
			) : (
				<>
					<Tooltip
						title={copied ? t("copied_message") : t("clickToCopy_message")}
						placement="top"
						arrow
					>
						<h1 className={`mb-2 text-2xl font-semibold line-clamp-4 ${text_styles}`} onClick={() => handle_copy(full_name_english, setCopied)}>
							{full_name_english}
						</h1>
					</Tooltip>
					<Tooltip
						title={copied ? t("copied_message") : t("clickToCopy_message")}
						placement="top"
						arrow
					>
						<h1 className={`text-xl ${text_styles}`} onClick={() => handle_copy(full_name_thai, setCopied)}>
							{full_name_thai}
						</h1>
					</Tooltip>
				</>
			)}
			{object.nickname && object.nickname_thai && (
				<h1 className="mt-2 text-xl font-semibold line-clamp-4">
					{i18n.language === "th"
						? `${object.nickname_thai} · ${object.nickname}`
						: `${object.nickname} · ${object.nickname_thai}`}
				</h1>
			)}
		</div>
	);
};

export default Rolodex_modal_names;
