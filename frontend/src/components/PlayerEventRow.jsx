import '../App.css';
import { MdEdit, MdDelete } from "react-icons/md";

const PlayerEventRow = ({ playerEvent, onEdit, onDelete }) => {
    return (
        <tr>
            {Object.values(playerEvent).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            <td>
                <MdEdit onClick={e => {e.preventDefault(); onEdit(playerEvent);}} id="edit" />
                <MdDelete onClick={e => {e.preventDefault(); onDelete(playerEvent.eventID, playerEvent.playerID);}} id="delete" />
            </td>
        </tr>
    );
};

export default PlayerEventRow;