import '../App.css';
import { MdEdit, MdDelete } from "react-icons/md";

const PlayerRow = ({ player, onEdit, onDelete }) => {
    return (
        <tr>
            {Object.values(player).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            <td>
                <MdEdit onClick={e => {e.preventDefault(); onEdit(player);}} id="edit" />
                <MdDelete onClick={e => {e.preventDefault(); onDelete(player.playerID);}} id="delete" />
            </td>
        </tr>
    );
};

export default PlayerRow;