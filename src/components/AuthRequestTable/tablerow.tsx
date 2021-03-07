import { TableRowProps } from './types';
import { Typography } from '@material-ui/core';


const TableRow: React.FC<TableRowProps> = ({ requestId, email, dateOfRequest, onClick }: TableRowProps) => {
    
    
    return (
        <tr onClick={onClick}>
            <td> <Typography variant="body2"> {requestId}</Typography> </td>
            <td> <Typography variant="body2">{email}</Typography> </td>
            <td> <Typography variant="body2">{dateOfRequest}</Typography> </td>
        </tr>
    )
}
export default TableRow; 