import CodeBox from "./components/CodeBox";
import { useState } from "react";
import { buttonType } from "./types";

let id = 0;
const map = new Map<number, number>();
map.set(id, 0);

function App() {

  const initialBoxList = [
    <CodeBox key={map.get(id++)} boxId={id.toString()} onUpdateBox={changeBox}/>,
  ];

  const [boxList, setBoxList] = useState(initialBoxList);

  function changeBox(boxId: number, type: buttonType) {
    if (type == buttonType.addBox) {
      map.set(id++, boxId);
      for (const [key, value] of map) {
        if (key > boxId)
          map.set(key, value + 1);
      }

      setBoxList([
        ...boxList.slice(0, boxId + 1),
        <CodeBox key={map.get(id)} boxId={id.toString()} onUpdateBox={changeBox}/>,
        ...boxList.slice(boxId),
      ]);
      id++;
    } else if (type == buttonType.deleteBox) {
      setBoxList(boxList.filter((box) => box.key != `${boxId}`));
    }
  }
  return (
    <div className="container mx-auto px-52 py-5 bg-white">
      <div className="flex flex-col">
        {
          boxList
        }
      </div>
    </div>
  );
}

export default App;