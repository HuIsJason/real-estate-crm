import { TableRowProps } from './types';
import { Typography } from '@material-ui/core';


const TableRow: React.FC<TableRowProps> = ({ username, email, dateOfSignUp, onClick }: TableRowProps) => {
    
    
    return (
        <tr onClick={onClick}>
            <td> <Typography variant="body2"> {username}</Typography> </td>
            <td> <Typography variant="body2">{email}</Typography> </td>
            <td> <Typography variant="body2">{dateOfSignUp}</Typography> </td>
        </tr>
    )
}
export default TableRow; 