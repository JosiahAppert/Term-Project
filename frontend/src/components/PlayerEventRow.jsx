import DeletePlayerEventForm from "./DeletePlayerEventForm";

const PlayerEventRow = ({ rowObject, backendURL, refreshPlayerEvent }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            
            <DeletePlayerEventForm rowObject={rowObject} backendURL={backendURL} refreshPlayerEvent={refreshPlayerEvent} />
        </tr>
    );
};

export default PlayerEventRow;