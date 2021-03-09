import { Dispatch, SetStateAction } from "react"; 

export interface TransparentNavBarProps {
  page: string,
  handlePageChange: (newPage : string) => void
}
  