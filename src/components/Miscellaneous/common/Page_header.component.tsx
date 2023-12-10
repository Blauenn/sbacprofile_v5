interface CurrentComponentProp {
	icon?: string;
	text: string;
	subtext?: string | number;
}

const Page_header = (props: CurrentComponentProp) => {
	const { icon, text, subtext } = props;

	return (
		<div className="flex flex-row items-center justify-between mb-8">
			<h1 className="text-2xl sm:text-3xl | font-semibold">
				{icon ? <i className={`hidden sm:inline-block | ${icon} me-4`}></i> : null}
				{text}
			</h1>
			{subtext != "" ? (
				<h1 className="text-2xl opacity-75">{subtext}</h1>
			) : null}
		</div>
	);
};

export default Page_header;
