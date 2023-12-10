import { useState } from "react";
import { StudentInterface } from "../../../../../interfaces/profiles.interface";
// Contexts //
import { MajorContextProvider } from "../../../../../contexts/Major.context";
// Components //
import Admin_Students_modal_update from "../modal/Admin_Students_modal_update.component";
// Constants //
import { CDN_ENDPOINT } from "../../../../../constants/ENDPOINTS";
import { hover_transition } from "../../../../../constants/styles/transition.style";
import { background_color_from_major } from "../../../../../constants/styles/colors/color_from_major.constant";
import { default_image } from "../../../../../constants/miscellaneous/default_image.constant";

interface CurrentComponentProp {
	student: StudentInterface;
}

const Admin_Students_rolodex_card = (props: CurrentComponentProp) => {
	const { student } = props;

	const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
	const onUpdateModalClose = () => {
		setUpdateModalOpen(false);
	};

	return (
		<>
			<div className={`flex flex-row items-center gap-4 px-4 py-2 bg-white rounded-xl hover:bg-slate-200 cursor-pointer ${hover_transition}`}
				onClick={() => { setUpdateModalOpen(true); }}>
				<img src={`${CDN_ENDPOINT}${student.student_image}`} className={`w-[50px] h-[50px] rounded-full ${background_color_from_major[student.student_major]}`}
					onError={(e) => {
						e.currentTarget.src = default_image;
					}} />
				<div>
					<h1 className="text-lg">{student.student_first_name}</h1>
					<h1 className="opacity-50 text-md">{student.student_last_name}</h1>
				</div>
			</div>
			<MajorContextProvider>
				<Admin_Students_modal_update student={student} open={updateModalOpen} onModalClose={onUpdateModalClose} />
			</MajorContextProvider>
		</>
	);
};

export default Admin_Students_rolodex_card;