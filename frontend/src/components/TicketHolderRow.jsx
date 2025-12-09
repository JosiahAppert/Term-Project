// ###############################################################################
// frontend/src/components/TicketHolderRow.jsx
// Citations for the following code:
//   Adapted from the following sources:
//   1. Exploration - Web Application Technology
//      Date: November 3, 2025
//      https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-
//         application-technology-2?module_item_id=25645131
// ###############################################################################
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