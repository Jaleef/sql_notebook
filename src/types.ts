export enum buttonType {
  addBox,
  deleteBox,
}


export interface BoxType {
  boxId: string;
  onUpdateBox: (boxId: number, type: buttonType) => void;
}