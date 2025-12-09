// ###############################################################################
// frontend/src/components/TicketRow.jsx
// Citations for the following code:
//   Adapted from the following sources:
//   1. Exploration - Web Application Technology
//        https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-
//           application-technology-2?module_item_id=25645131
// ###############################################################################
import '../App.css';
import { MdEdit, MdDelete } from "react-icons/md";

const TicketRow = ({ ticket, onEdit, onDelete }) => {
    return (
        <tr>
            {Object.values(ticket).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            <td>
                <MdEdit onClick={e => {e.preventDefault(); onEdit(ticket);}} id="edit" />
                <MdDelete onClick={e => {e.preventDefault(); onDelete(ticket.ticketID);}} id="delete" />
            </td>
        </tr>
    );
};

export default TicketRow;