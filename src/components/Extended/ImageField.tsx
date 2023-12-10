// Functions //
import { handle_image_change } from "../../functions/fields.function";
// Constants //
import { CDN_ENDPOINT } from "../../constants/ENDPOINTS";
import { default_image } from "../../constants/miscellaneous/default_image.constant";
import { background_color_from_major } from "../../constants/styles/colors/color_from_major.constant";
import { hover_transition } from "../../constants/styles/transition.style";

const ImageField_profile_image_styles =
	"flex justify-center items-center border cursor-pointer w-[120px] h-[120px] sm:w-[300px] sm:h-[300px] | rounded-full overflow-hidden";

// For students and teachers CRUD //
interface CurrentComponentProp {
	imageObject: any;
	fieldName: string;
	profile_image?: string;
	profile_major?: number;
	imagePreview: string;
	setImagePreview: any;
	setImage: any;
	setFileSizeNotice: any;
}
const ImageField = (props: CurrentComponentProp) => {
	const {
		imageObject,
		fieldName,
		profile_image,
		profile_major,
		imagePreview,
		setImagePreview,
		setImage,
		setFileSizeNotice,
	} = props;

	return (
		<>
			{imageObject ? (
				<div className={`${ImageField_profile_image_styles} bg-primary`}>
					<img src={imagePreview || ""} />
				</div>
			) : profile_image && profile_major ? (
				<div
					className={`${ImageField_profile_image_styles} ${background_color_from_major[profile_major]}`}>
					<img
						src={`${CDN_ENDPOINT}${profile_image}`}
						onError={(e) => {
							e.currentTarget.src = default_image;
						}}
					/>
				</div>
			) : (
				<div className={`${ImageField_profile_image_styles} hover:bg-slate-100 ${hover_transition}`}>
					<i className="text-4xl opacity-50 fa-solid fa-image sm:text-6xl"></i>
				</div>
			)}
			<input
				name={fieldName}
				id={fieldName}
				type="file"
				accept=".jpg, .jpeg, .png"
				hidden
				onChange={(event) => {
					handle_image_change(
						event,
						setImagePreview,
						setImage,
						setFileSizeNotice
					);
				}}
			/>
		</>
	);
};

export default ImageField;