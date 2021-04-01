import { Dispatch, SetStateAction } from "react"; 

export interface DataFields {
  firstName: string, 
  lastName: string, 
  tags: string,
  _id: string,
}

export interface RowProps {
  firstName: string, 
  lastName: string, 
  tags: string,
  id: string,
  rows: DataFields[],
  handleSetRows: (newRows : DataFields[]) => void
  // page: number,
  // setPage: Dispatch<SetStateAction<number>>
}
