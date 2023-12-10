import { CDN_ENDPOINT } from "../../constants/ENDPOINTS";
import { default_image } from "../../constants/miscellaneous/default_image.constant";
import { background_color_from_major } from "../../constants/styles/colors/color_from_major.constant";

interface CurrentComponentProp {
	imageURL: string | undefined;
	profileMajor: number;
}

const Avatar = (props: CurrentComponentProp) => {
	const { imageURL, profileMajor } = props;

	return (
		<div className="avatar">
			<div className={`w-[40px] h-[40px] rounded-full ${background_color_from_major[profileMajor]}`}>
				<img
					src={`${CDN_ENDPOINT}${imageURL}`}
					loading="lazy"
					onError={(e) => {
						e.currentTarget.src = default_image;
					}}
				/>
			</div>
		</div>
	);
};

export default Avatar;
