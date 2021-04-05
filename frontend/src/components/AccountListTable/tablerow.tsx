import { Typography } from '@material-ui/core';
import { TableRowProps } from './types';


const TableRow: React.FC<TableRowProps> = ({ username, lastLogin, onClick }: TableRowProps) => {
    
    
    return (
        <tr onClick={onClick}>
            <td> <Typography variant="body2"> {username} </Typography></td>
            <td> <Typography variant="body2"> {lastLogin} </Typography></td>
        </tr>
    )
}
export default TableRow; 