import '../App.css';
import { MdEdit, MdDelete } from "react-icons/md";

const EventRow = ({ event, onEdit, onDelete }) => {
    return (
        <tr>
            {Object.values(event).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            <td>
                <MdEdit onClick={e => {e.preventDefault(); onEdit(event);}} id="edit" />
                <MdDelete onClick={e => {e.preventDefault(); onDelete(event.eventID);}} id="delete" />
            </td>            
        </tr>
    );
};

export default EventRow;