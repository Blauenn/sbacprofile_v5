import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from "../../../Extended/Modal";
// Functions //
import { logout } from '../../../../functions/account/logout.function';
// Contexts //
import { useContext_Account } from '../../../../contexts/Account.context';
import Button from "../../../Extended/Button";

interface CurrentComponentProp {
	open: boolean;
	onModalClose: () => void;
}

const Sidebar_modal_logout = (props: CurrentComponentProp) => {
	const { open, onModalClose } = props;

	const { setAccessToken, setUserInfo, setIsLoggedIn } = useContext_Account();

	const [shouldClear, setShouldClear] = useState(true);

	const { t } = useTranslation('sidebar');

	return (
		<Modal open={open} onModalClose={onModalClose}>
			<h1 className="text-2xl font-semibold mb-4">
				<i className="fa-solid fa-right-from-bracket rotate-180 me-4"></i>
				{t("logout_title")}
			</h1>
			<h1 className="text-lg opacity-50 mb-8">{t("logout_message")}</h1>
			<div className="flex flex-row justify-end gap-4 w-full">
				<Button
					onClick={() => {
						logout(
							setAccessToken,
							setUserInfo,
							setIsLoggedIn,
							shouldClear,
							setShouldClear
						);
					}}
					label={t("logout_confirm_button_title")}
					background_color="hover:bg-error"
					border_color="border-error"
					text_color="text-error"
				/>
				<Button
					onClick={onModalClose}
					label={t("logout_cancel_button_title")}
					background_color="bg-error"
					border_color="border-error"
					text_color="text-white"
				/>
			</div>
		</Modal>
	);
};

export default Sidebar_modal_logout;