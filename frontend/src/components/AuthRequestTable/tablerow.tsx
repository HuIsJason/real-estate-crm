import { TableRowProps } from './types';
import { Typography } from '@material-ui/core';

import date from 'date-and-time';


const TableRow: React.FC<TableRowProps> = ({ username, email, dateOfSignUp, onClick }: TableRowProps) => {
    
    const formatTime = function(timeString: string | undefined) {
        if (timeString) {
            const time = new Date(timeString);
            return date.format(time, 'YYYY-MM-DD [at] HH:mm:ss');
        }
    }
    
    return (
        <tr onClick={onClick}>
            <td> <Typography variant="body2"> {username}</Typography> </td>
            <td> <Typography variant="body2">{email}</Typography> </td>
            <td> <Typography variant="body2">{formatTime(dateOfSignUp)}</Typography> </td>
        </tr>
    )
}
export default TableRow; 