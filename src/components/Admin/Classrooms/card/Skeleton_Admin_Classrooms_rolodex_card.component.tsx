const Skeleton_Admin_Classrooms_rolodex_card = () => {
	return (
		<div className={`flex flex-row gap-4 px-4 py-2 bg-white rounded-xl`}>
			<div className="skeleton rounded-full w-[50px] h-[50px]"></div>
			<div className="flex flex-col justify-center gap-1">
				<div className="skeleton w-[140px] h-[16px]"></div>
				<div className="skeleton w-[80px] h-[12px]"></div>
			</div>
		</div>
	);
};

export default Skeleton_Admin_Classrooms_rolodex_card;