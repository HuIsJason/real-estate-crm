import { DataFields } from "../ClientList/types"

export default interface AddClientButtonProps {
    rows: DataFields[],
    setRows: (newRows : DataFields[]) => void
    
}