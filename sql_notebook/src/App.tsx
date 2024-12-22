import { CodeBox } from "./components";
import { useEffect, useState } from "react";
import { TrashIcon } from "./assets";
import axios from "axios";

function App() {
	const [boxList, setBoxList] = useState([{ boxId: 0, index: 0, output: "" }]);
	const [id, setId] = useState<number>(1);
	const [index, setIndex] = useState<number>(0);
	const [selectedId, setSelectedId] = useState<number>(0);
	const [connect, setConnect] = useState<boolean>(false);

	function addBox() {
		setBoxList([...boxList, { boxId: id, index: 0, output: "" }]);
		setId(id + 1);
	}

	function deleteBox(boxId: number) {
		setBoxList(
			boxList.filter((box) => {
				return box.boxId !== boxId;
			}),
		);
	}

	const fetchData = async (sqlQuery: string) => {
		const response = await axios.post("http://localhost:9000/query", {
			query: sqlQuery,
		});
		return response;
	};

	async function runBox(boxId: number, sqlQuery: string) {
		setIndex(index + 1);

		const newList = await Promise.all(
			boxList.map(async (box) => {
				if (box.boxId === boxId) {
					let data: string = "";
					alert(sqlQuery);
					if (sqlQuery) {
						await fetchData(sqlQuery)
							.then((response) => response.data)
							.then((result: { output: string }) => {
								data = result.output;
							});
					}
					return { ...box, index: index, output: data };
				} else {
					return box;
				}
			}),
		);

		setBoxList(newList);
	}

	function clickBox(boxId: number) {
		setSelectedId(boxId);
	}

	useEffect(() => {
		if (!connect) {
			axios
				.get("http://localhost:9000/connect")
				.then((response) => response.data)
				.then((data) => {
					if (data.error) {
						alert(data.message);
					} else {
						alert(data.message);
						setConnect(true);
					}
				});
		}
	});

	return (
		<div className="container mx-auto px-52 py-5 bg-white">
			{/* 列表部分 */}
			<div className="flex flex-col">
				{boxList.map((box) => (
					<div
						className="mb-5"
						key={box.boxId}
					>
						<div className="flex justify-end">
							<div className="border-2 border-gray-300">
								<div onClick={() => deleteBox(box.boxId)}>
									<TrashIcon />
								</div>
							</div>
						</div>
						<CodeBox
							boxId={box.boxId}
							index={box.index}
							runBox={runBox}
							selected={box.boxId == selectedId ? true : false}
							onClick={clickBox}
						/>

						{/* 输出区 */}
						<div className="flex flex-col">
							<div className="border-2 border-green-200">{box.output}</div>
						</div>
						{/* 输出区 */}
					</div>
				))}
			</div>

			{/* 添加按钮 */}
			<div className="flex flex-row justify-center gap-2">
				<div
					className="border-2 border-gray-300 px-2"
					onClick={() => addBox()}
				>
					+ Code
				</div>
				<div className="border-2 border-gray-300 px-2">+ Markdown</div>
			</div>
		</div>
	);
}

export default App;
