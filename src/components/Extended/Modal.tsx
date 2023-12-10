import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface CurrentComponentProp {
	icon?: string;
	title?: string;
	open: boolean;
	onModalClose: () => void;
	overflow?: boolean;
	children: React.ReactNode;
}

const Modal = (props: CurrentComponentProp) => {
	const { icon, title, open, onModalClose, overflow, children } = props;

	return (
		<Transition show={open} as={Fragment}>
			<Dialog
				as="div"
				className={`fixed inset-0 z-30 flex ${overflow || "items-center"} justify-center w-full h-auto my-4`}
				onClose={onModalClose}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-50"
					leave="ease-in duration-200"
					leaveFrom="opacity-50"
					leaveTo="opacity-0"
				>
					<Dialog.Overlay className="fixed inset-0 opacity-0 bg-neutral" />
				</Transition.Child>

				<Transition.Child
					as={Fragment}
					enter="ease-in-out duration-300"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="ease-in-out duration-200"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					<div className={`flex flex-col bg-white rounded-xl min-w-[300px] sm:w-auto ${overflow ? "overflow-y-scroll" : null} h-auto overflow-hidden`}>
						{title ? (
							<div className="sticky top-0 z-40 flex flex-row items-center justify-between p-4 bg-white border-b">
								<h1>
									{icon ? <i className={`${icon} me-2`}></i> : null}
									{title}
								</h1>
								<button
									onClick={onModalClose}
									className="flex justify-center items-center bg-red-600 hover:bg-red-700 rounded-full w-[20px] h-[20px]"
								></button>
							</div>
						) : null}
						<div className="px-4 py-6">
							{children}
						</div>
					</div>
				</Transition.Child>
			</Dialog>
		</Transition>
	);
};

export default Modal;
