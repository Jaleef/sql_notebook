import { useState } from "react";
import { RunIcon } from "../assets";
import { BoxType} from "../types";

function CodeBox({ boxId, index, runBox }: BoxType) {
	const activeColor: string = "border-blue-500";
	const inactiveColor: string = "border-gray-200";
	const codeBgColor: string = "bg-gray-100";
	const codeBorderColor: string = "border-gray-300";

	const [hover, setHover] = useState<boolean>(false);
	const [click, setClick] = useState<boolean>(false);

	console.log("boxId: ", boxId);

	return (
		<div
			className="flex flex-col border-2 border-gray-300 "
			onMouseEnter={() => {
				// console.log("hover");
				setHover(true);
			}}
			onMouseLeave={() => {
				// console.log("leave");
				setHover(false);
			}}
			onClick={() => {
				// console.log("clicked");
				setClick(true);
			}}>
			<h1>{boxId}</h1>
			<div className="flex flex-row">
				{/* 最左边的一个侧边栏, 在hover时灰色, 在click时为蓝色 */}
				<div
					className={`border-l-4 ${
						click
							? activeColor
							: hover
							? inactiveColor
							: "border-l-white"
					}`}></div>
				{/*  */}

				{/* 运行框 */}
				<div className="flex flex-col justify-between">
					<div onClick={() => {
						runBox(boxId);
					}}>
					<RunIcon />
					</div>

					<div >[{index == 0 ? ' ' : index}]</div>
				</div>
				{/* 运行框 */}

				{/* 代码框 */}
				<div
					className={`flex-grow border-2 ${
						click ? activeColor : codeBorderColor
					} ${codeBgColor}`}></div>
				{/* 代码框 */}
			</div>

			{/* 输出区 */}
			<div className="flex flex-col">
				<div className="border-2 border-green-200">这里是output</div>
			</div>
			{/* 输出区 */}
		</div>
	);
}

export default CodeBox;
