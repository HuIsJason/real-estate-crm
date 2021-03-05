import { TableRowProps } from './types';


const TableRow: React.FC<TableRowProps> = ({ email, lastLogin, onClick }: TableRowProps) => {
    
    
    return (
        <tr onClick={onClick}>
            <td> {email} </td>
            <td> {lastLogin} </td>
        </tr>
    )
}
export default TableRow; 