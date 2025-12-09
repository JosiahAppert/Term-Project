// ###############################################################################
// frontend/src/components/PlayerRow.jsx
// Citations for the following code:
//   Adapted from the following sources:
//   1. Exploration - Web Application Technology
//        https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-
//           application-technology-2?module_item_id=25645131
// ###############################################################################
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