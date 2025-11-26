import '../App.css';
import { MdEdit, MdDelete } from "react-icons/md";

const TicketHolderRow = ({ ticketHolder, onEdit, onDelete }) => {
    return (
        <tr>
            {Object.values(ticketHolder).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            <td>
                <MdEdit onClick={e => {e.preventDefault(); onEdit(ticketHolder);}} id="edit" />
                <MdDelete onClick={e => {e.preventDefault(); onDelete(ticketHolder.ticketHolderID);}} id="delete" />
            </td>
        </tr>
    );
};

export default TicketHolderRow;