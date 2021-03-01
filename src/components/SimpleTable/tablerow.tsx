import { TableRowProps } from './types';


const TableRow: React.FC<TableRowProps> = ({ requestId, email, dateOfRequest, onClick }: TableRowProps) => {
    
    
    return (
        <tr onClick={onClick}>
            <td> {requestId} </td>
            <td> {email} </td>
            <td> {dateOfRequest} </td>
        </tr>
    )
}
export default TableRow; 