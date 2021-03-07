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
  handleSetRows: (newRows : DataFields[]) => void // Dispatch<SetStateAction<DataFields[]>>,
  // page: number,
  // setPage: Dispatch<SetStateAction<number>>
}
