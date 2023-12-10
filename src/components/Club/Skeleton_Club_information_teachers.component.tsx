const Skeleton_Club_information_teachers = () => {
	return (
		<div className="flex flex-col gap-4">
			<div className="skeleton w-[80px] h-[16px]"></div>
			<div className="flex flex-col gap-2">
				{[...Array(2)].map((_, index) =>
					<div
						key={index}
						className="flex flex-row items-center gap-4">
						<div className="skeleton w-[32px] h-[32px] rounded-full"></div>
						<div className="flex flex-row gap-2">
							<div className="skeleton w-[100px] h-[12px]"></div>
							<div className="skeleton w-[60px] h-[12px]"></div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Skeleton_Club_information_teachers;