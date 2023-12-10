import { useTranslation } from "react-i18next";
import { formatDistanceToNow } from "date-fns";
// Functions //
import { change_to_date } from "../../../functions/dates.function";

interface CurrentComponentProp {
	status: number;
	create_datetime: string;
}

const Student_Club_information_requestStatus = (
	props: CurrentComponentProp
) => {
	const { status, create_datetime } = props;

	const { t } = useTranslation();

	return status === 1 ? (
		<>
			<h1 className="mb-2 text-xl font-semibold">
				{t("pendingApproval_message")}...
			</h1>
			<h1 className="mb-4 opacity-50">
				{formatDistanceToNow(change_to_date(create_datetime), {
					addSuffix: true,
				}).replace("about ", "")}
			</h1>
		</>
	) : (
		<>
			<h1 className="mb-2 text-xl font-semibold text-error">
				{t("rejected_message")}
			</h1>
			<h1 className="mb-4 opacity-50">
				{formatDistanceToNow(change_to_date(create_datetime), {
					addSuffix: true,
				}).replace("about ", "")}
			</h1>
		</>
	);
};

export default Student_Club_information_requestStatus;
