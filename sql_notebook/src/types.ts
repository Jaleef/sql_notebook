export enum buttonType {
  addBox,
  deleteBox,
}


export interface BoxType {
  boxId: number;
  index: number;
  runBox: (boxId: number, sqlQuery: string) => void;
  selected: boolean;
  onClick: (boxId: number) => void;
}
