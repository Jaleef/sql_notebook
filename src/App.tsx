import CodeBox from "./components/CodeBox";
import { useState } from "react";

let id = 0;
function App() {
  const initialBoxList = [
    <CodeBox key={id} boxId={id.toString()} />,
  ];
  id++;

  const [boxList, setBoxList] = useState(initialBoxList);


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