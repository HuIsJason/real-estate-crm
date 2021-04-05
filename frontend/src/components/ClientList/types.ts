import { Dispatch, SetStateAction } from "react"; 

export interface DataFields {
  firstName: string, 
  lastName: string, 
  tags: string,
  _id: string
}

export interface RowProps {
  firstName: string, 
  lastName: string, 
  tags: string,
  id: string,
  handleDelete: (id : string) => void
}
