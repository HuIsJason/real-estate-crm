import { Typography } from '@material-ui/core';
import { TableRowProps } from './types';


const TableRow: React.FC<TableRowProps> = ({ activityTitle, date, onClick }: TableRowProps) => {
    
    
    return (
        <tr onClick={onClick}>
            <td> <Typography variant="body2"> {activityTitle} </Typography></td>
            <td> <Typography variant="body2"> {date} </Typography></td>
        </tr>
    )
}
export default TableRow; 