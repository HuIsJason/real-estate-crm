import { Dispatch, SetStateAction } from "react";
import { RowProps, DataFields } from "../ClientList/types"

export default interface AddClientButtonProps {
    rows: DataFields[],
    setRows: Dispatch<SetStateAction<DataFields[]>>
    
}