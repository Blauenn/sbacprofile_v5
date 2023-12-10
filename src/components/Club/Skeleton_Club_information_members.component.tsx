// Components //
import Skeleton_Club_studentInfo from "./clubRequests/Skeleton_Club_studentInfo.component";

const Skeleton_Club_information_members = () => {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-row justify-between">
				<div className="skeleton w-[80px] h-[16px]"></div>
			</div>
			<div className="flex flex-col gap-2">
				{[...Array(12)].map((_, index) => (
					<div
						key={index}
						className="flex flex-row items-center justify-between">
						<Skeleton_Club_studentInfo />
					</div>
				))}
			</div>
		</div>
	);
};

export default Skeleton_Club_information_members;