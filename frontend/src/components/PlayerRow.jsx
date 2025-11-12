import DeletePlayerForm from "./DeletePlayerForm";

const PlayerRow = ({ rowObject, backendURL, refreshPlayer }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            
            <DeletePlayerForm rowObject={rowObject} backendURL={backendURL} refreshPlayer={refreshPlayer} />
        </tr>
    );
};

export default PlayerRow;