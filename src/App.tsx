import CodeBox from "./components/CodeBox";
import { useState } from "react";
import { TrashIcon } from "./assets";

function App() {
	const [boxList, setBoxList] = useState([{ boxId: 0, index: 0}]);
	const [id, setId] = useState<number>(1);
  const [index, setIndex] = useState<number>(0);
  const [selectedId, setSelectedId] = useState<number>(0);

	function addBox() {
		setBoxList([...boxList, { boxId: id, index: 0 }]);
		setId(id + 1);
	}

	function deleteBox(boxId: number) {
		setBoxList(
			boxList.filter((box) => {
				return box.boxId !== boxId;
			}),
		);
	}

  function runBox(boxId: number) {
    setIndex(index + 1);
    const newList = boxList.map((box) => {
      if (box.boxId === boxId) {
        return { boxId: boxId, index: index + 1 };
      } else {
        return box;
      }
    });
    setBoxList(newList);

  }

  function clickBox(boxId: number) {
    setSelectedId(boxId);
  }

	return (
		<div className="container mx-auto px-52 py-5 bg-white">
			{/* 列表部分 */}
			<div className="flex flex-col">
				{boxList.map((box) => (
					<div className="mb-5">
						<div
							className="flex justify-end"
							onClick={() => deleteBox(box.boxId)}
						>
              <div className="border-2 border-gray-300">
							<TrashIcon />
              </div>
						</div>
						<CodeBox boxId={box.boxId} index={box.index} runBox={runBox} selected={box.boxId == selectedId ? true : false} onClick={clickBox}/>
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
