export enum buttonType {
  addBox,
  deleteBox,
}


export interface BoxType {
  boxId: number;
  index: number;
  runBox: (boxId: number) => void;
  selected: boolean;
  onClick: (boxId: number) => void;
}
