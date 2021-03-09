import { Dispatch, SetStateAction } from "react"; 

export interface DataFields {
  name: string, 
  email: string, 
  tags: string,
  id: string,
}

export interface RowProps {
  name: string, 
  email: string, 
  tags: string,
  id: string,
  rows: DataFields[],
  handleSetRows: (newRows : DataFields[]) => void
  // page: number,
  // setPage: Dispatch<SetStateAction<number>>
}
