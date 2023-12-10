// Constants //
import { background_color_from_major } from "../../../../constants/styles/colors/color_from_major.constant";
import { default_image } from "../../../../constants/miscellaneous/default_image.constant";
import { CDN_ENDPOINT } from "../../../../constants/ENDPOINTS";

interface CurrentComponentProp {
	image: string;
	major: number;
}

const Rolodex_modal_image = (props: CurrentComponentProp) => {
	const { image, major } = props;

	const majorColor = background_color_from_major[major];

	return (
		<div
			className={`flex justify-center items-center w-[220px] h-[220px] | ${majorColor} rounded-full overflow-hidden`}>
			<img
				src={`${CDN_ENDPOINT}${image}`}
				onError={(e) => {
					e.currentTarget.src = default_image;
				}}
			/>
		</div>
	);
};

export default Rolodex_modal_image;
