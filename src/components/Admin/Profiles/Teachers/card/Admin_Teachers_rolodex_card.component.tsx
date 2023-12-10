import { useState } from "react";
import { TeacherInterface } from "../../../../../interfaces/profiles.interface";
// Contexts //
import { MajorContextProvider } from "../../../../../contexts/Major.context";
// Components //
import Admin_teachers_modal_update from "../modal/Admin_Teachers_modal_update.component";
// Constants //
import { background_color_from_major } from "../../../../../constants/styles/colors/color_from_major.constant";
import { hover_transition } from "../../../../../constants/styles/transition.style";
import { CDN_ENDPOINT } from "../../../../../constants/ENDPOINTS";
import { default_image } from "../../../../../constants/miscellaneous/default_image.constant";

interface CurrentComponentProp {
	teacher: TeacherInterface;
}

const Admin_Teachers_rolodex_card = (props: CurrentComponentProp) => {
	const { teacher } = props;

	const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
	const onUpdateModalClose = () => {
		setUpdateModalOpen(false);
	};

	return (
		<>
			<div className={`flex flex-row items-center gap-4 px-4 py-2 bg-white rounded-xl hover:bg-slate-200 cursor-pointer ${hover_transition}`} onClick={() => { setUpdateModalOpen(true); }}>
				<img src={`${CDN_ENDPOINT}${teacher.teacher_image}`} className={`w-[50px] h-[50px] rounded-full ${background_color_from_major[teacher.teacher_major]}`}
					onError={(e) => {
						e.currentTarget.src = default_image;
					}} />
				<div>
					<h1 className="text-lg">{teacher.teacher_first_name}</h1>
					<h1 className="opacity-50 text-md">{teacher.teacher_last_name}</h1>
				</div>
			</div>
			<MajorContextProvider>
				<Admin_teachers_modal_update teacher={teacher} open={updateModalOpen} onModalClose={onUpdateModalClose} />
			</MajorContextProvider>
		</>
	);
};

export default Admin_Teachers_rolodex_card;