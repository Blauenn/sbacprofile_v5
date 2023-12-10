// Components //
import Skeleton_Profiles_Rolodex_card_image from "./Skeleton_Profiles_Rolodex_card_image.component";
// Constants //
import { hover_transition } from "../../../../constants/styles/transition.style";

const rolodex_card_style = `relative flex items-center flex-col bg-white shadow-sm rounded-xl py-4 | ${hover_transition} hover:bg-slate-200 cursor-pointer`;

const Skeleton_Profiles_Rolodex_card = () => (
	<div className={`${rolodex_card_style}`}>
		<div className="flex flex-col items-center justify-center w-full py-2">
			<Skeleton_Profiles_Rolodex_card_image />
			<div className="w-5/6">
				<div className="skeleton w-full h-[20px]"></div>
			</div>
		</div>
	</div>
);

export default Skeleton_Profiles_Rolodex_card;
