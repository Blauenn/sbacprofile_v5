import { useState } from "react";
import { handle_file_input_change } from "../../functions/fields.function";

interface CurrentComponentProp {
	file: any;
	setFile: any;
	setFileName: any;
	fileLabel: string;
	fileSizeNoticeMessage: string;
}

const FileField = (props: CurrentComponentProp) => {
	const {
		file,
		setFile,
		setFileName,
		fileLabel,
		fileSizeNoticeMessage,
	} = props;

	const [fileSizeNotice, setFileSizeNotice] = useState(false);

	return (
		<div className="flex flex-col gap-2">
			<div className="border border-opacity-25 border-standardBlack hover:border-opacity-100 rounded-xl w-full h-[100px]">
				<label htmlFor="attached_file">
					{file ? (
						<>
							<div className="flex flex-row items-center justify-center w-full h-full gap-4 px-8 cursor-pointer">
								<h1 className="text-xl truncate">{file.name}</h1>
							</div>
							<input
								type="file"
								name="attached_file"
								id="attached_file"
								hidden
								onChange={(event) => {
									handle_file_input_change(
										'input[name="attached_file"]',
										event,
										setFile,
										setFileName,
										setFileSizeNotice
									);
								}}
							/>
						</>
					) : (
						<>
							<div className="flex flex-row items-center justify-center w-full h-full gap-4 opacity-75">
								<i className="text-4xl fa-solid fa-folder"></i>
								<h1 className="text-xl">{fileLabel}</h1>
							</div>
							<input
								type="file"
								name="attached_file"
								id="attached_file"
								hidden
								onChange={(event) => {
									handle_file_input_change(
										'input[name="attached_file"]',
										event,
										setFile,
										setFileName,
										setFileSizeNotice
									);
								}}
							/>
						</>
					)}
				</label>
			</div>
			{fileSizeNotice && (
				<h1 className="mb-2 text-sm text-error">{fileSizeNoticeMessage}</h1>
			)}
		</div>
	);
};

export default FileField;
