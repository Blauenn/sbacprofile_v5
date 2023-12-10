const Skeleton_Admin_Profiles_rolodex_card = () => {
	return (
		<div>
			<div className={`flex flex-row items-center gap-4 px-4 py-2 bg-white rounded-xl`}>
				<div className="skeleton rounded-full w-[50px] h-[50px]"></div>
				<div className="flex flex-col gap-1">
					<div className="skeleton rounded-xl w-[160px] h-[16px]"></div>
					<div className="skeleton rounded-xl w-[100px] h-[12px]"></div>
				</div>
			</div>
		</div>
	);
};

export default Skeleton_Admin_Profiles_rolodex_card;