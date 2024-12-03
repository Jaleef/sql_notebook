import { useState } from "react";
import RunIcon from "../assets/RunIcon";
import AddCode from "../assets/AddCode";
import AddMarkdown from "../assets/AddMarkdown";

function CodeBox() {
	const activeColor: string = "border-blue-500";
	const inactiveColor: string = "border-gray-200";
	const codeBgColor: string = "bg-gray-100";
	const codeBorderColor: string = "border-gray-300";

	const [hover, setHover] = useState<boolean>(false);
	const [click, setClick] = useState<boolean>(false);
	return (
		<div
			className="flex flex-col border-2 border-gray-300 "
			onMouseEnter={() => {
				console.log("hover");
				setHover(true);
			}}
			onMouseLeave={() => {
				console.log("leave");
				setHover(false);
			}}
			onClick={() => {
				console.log("clicked");
				setClick(true);
			}}>
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
					<RunIcon />

					<div>[{1}]</div>
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
        <div className="flex flex-row justify-center gap-2">
          <AddCode />
          <AddMarkdown />
        </div>
      </div>
      {/* 输出区 */}
		</div>
	);
}

export default CodeBox;
