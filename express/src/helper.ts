export enum QueryType {
  SHOW,
  USE,
  SELECT,
  INSERT,
  UPDATE,
  DELETE,
}

export const checkQueryType = (sqlQuery: string) => {

  return QueryType.SHOW;
}
