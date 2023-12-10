// Components //
import Skeleton_Club_studentInfo from "./clubRequests/Skeleton_Club_studentInfo.component";

const Skeleton_Club_clubRequests = () => {
	return (
		<div className="flex flex-col gap-4">
					<div className="flex flex-row justify-between">
						<h1 className="opacity-50">
							<div className="skeleton w-[120px] h-[16px]"></div>
						</h1>
					</div>
					<div className="flex flex-col gap-2">
						{[...Array(3)].map((_, index) => (
							<div
								key={index}
								className="flex flex-row items-center justify-between">
								<Skeleton_Club_studentInfo />
							</div>
						))}
					</div>
				</div>
	)
}

export default Skeleton_Club_clubRequests;