import { useTranslation } from "react-i18next";

const Loading = () => {
	const { t } = useTranslation("common");

	return (
		<div className="flex flex-col items-center justify-center w-full gap-8 mt-16">
			<span className="loading loading-dots loading-lg"></span>
			<h1 className="text-xl opacity-50">{t("loading_message")}</h1>
		</div>
	);
};

export default Loading;
