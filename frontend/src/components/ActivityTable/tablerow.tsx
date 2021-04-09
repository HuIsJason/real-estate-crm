import { Typography } from '@material-ui/core';
import { TableRowProps } from './types';


const TableRow: React.FC<TableRowProps> = ({ activityTitle, date, onClick }: TableRowProps) => {
    
    const formatDate = (dateString: string) => {
        return dateString.slice(0, 10);
    } 
    
    return (
        <tr onClick={onClick}>
            <td> <Typography variant="body2"> {activityTitle} </Typography></td>
            <td> <Typography variant="body2"> {formatDate(date)} </Typography></td>
        </tr>
    )
}
export default TableRow; 