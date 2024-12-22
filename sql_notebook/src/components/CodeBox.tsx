import React, { useEffect, useState, useRef } from "react";
import { RunIcon } from "../assets";
import { BoxType } from "../types";

export const CodeBox = ({
	boxId,
	index,
	runBox,
	selected,
	onClick,
}: BoxType) => {
	const activeColor: string = "border-blue-500";
	const inactiveColor: string = "border-gray-200";
	const codeBgColor: string = "bg-gray-100";
	const codeBorderColor: string = "border-gray-300";

	const [hover, setHover] = useState<boolean>(false);
	const editorId = "editor" + boxId.toString();
	const runId = "run" + boxId.toString();

	const [value, setValue] = useState<string>("");
	const textareaRef = useRef(null);

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setValue(e.target.value);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.ctrlKey && e.key === 'Enter') {
			e.preventDefault();
			runBox(boxId, value);
		}
	}
	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto"; // 重置高度
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 设置为内容的高度
		}
	}, [value]); // 每次内容变化时更新高度

	return (
		<div
			className="flex flex-col border-2 border-gray-300 bg-gray-200 mt-2"
			onMouseEnter={() => {
				setHover(true);
			}}
			onMouseLeave={() => {
				setHover(false);
			}}
			onClick={() => {
				onClick(boxId);
			}}
		>
			<div className="flex flex-row">
				{/* 最左边的一个侧边栏, 在hover时灰色, 在click时为蓝色 */}
				<div
					className={`border-l-4 ${
						selected ? activeColor : hover ? inactiveColor : "border-gray-200"
					}`}
				></div>
				{/*  */}

				{/* 运行框 */}
				<div className="flex flex-col justify-between">
					<div id={runId} onClick={() => { 
						// alert(value);
						runBox(boxId, value)
					}}>
						<RunIcon />
					</div>

					<div>[{index == 0 ? " " : index}]</div>
				</div>
				{/* 运行框 */}

				{/* 代码框 */}
				<div
					className={`flex-grow bg-gray-200 ${
						selected ? activeColor : codeBorderColor
					} ${codeBgColor}`}
				>
					<textarea
						id={editorId}
						ref={textareaRef}
						value={value}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						placeholder="输入sql语句"
						rows={1} // 设置初始行数
						style={{
							width: "97%",
							resize: "none", // 禁止手动调整大小
							overflow: "hidden", // 隐藏溢出内容
							minHeight: "100%", // 设置最小高度
							border: "none", // 去掉边框
							outline: "none", // 去掉聚焦时的边框
						}}
						className={`ml-5 bg-gray-200 ${selected ? "bg-green-100": "bg-gray-200"}`}
					/>
				</div>
				{/* 代码框 */}
			</div>

		</div>
	);
};
