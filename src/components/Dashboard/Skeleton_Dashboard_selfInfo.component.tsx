const Skeleton_Dashboard_selfInfo = () => {
	return (
		<div>
			<div className={`bg-white shadow-sm rounded-xl`}>
				<div className="grid grid-cols-1 min-[500px]:grid-cols-5 xl:grid-cols-1 gap-2 min-[500px]:gap-8 xl:gap-2 px-8 py-4">
					<div className="flex flex-col items-center col-span-2 gap-2 mb-4">
						<div className="overflow-hidden rounded-full">
							<div className="skeleton w-[180px] h-[180px]"></div>
						</div>
						<div className="skeleton w-[64px] h-[12px]"></div>
					</div>
					<div className="flex flex-col justify-center col-span-3 gap-4 mt-2 mb-4">
						<div className="flex flex-col gap-2">
							<div className="skeleton w-[200px] h-[24px]"></div>
							<div className="skeleton w-[160px] h-[16px]"></div>
						</div>
						<div className="flex flex-col gap-2">
							{/* Email */}
							<div className="skeleton w-[140px] h-[16px]"></div>
							<div className="skeleton w-[100px] h-[16px]"></div>
							<div className="skeleton w-[120px] h-[16px]"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Skeleton_Dashboard_selfInfo;