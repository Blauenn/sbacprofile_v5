const Skeleton_Clubs_rolodex_card = () => {
	return (
		<div
			className={`bg-white rounded-xl overflow-hidden`}>
			<div className="bg-gray-500 opacity-25 h-[200px]">
			</div>
			<div className="flex flex-col gap-2 px-4 py-6">
				<div className="skeleton w-[160px] h-[20px]"></div>
				<div className="skeleton w-[120px] h-[16px]"></div>
			</div>
		</div>
	);
};

export default Skeleton_Clubs_rolodex_card;