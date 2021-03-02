import { Dispatch, SetStateAction } from "react";
import { RowProps } from "../ClientList/types"

export default interface AddClientButtonProps {
    rows: RowProps[],
    setRows: Dispatch<SetStateAction<RowProps[]>>,
    
}