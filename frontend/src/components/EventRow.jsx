import DeleteEventForm from "./DeleteEventForm";

const EventRow = ({ rowObject, backendURL, refreshEvent }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            
            <DeleteEventForm rowObject={rowObject} backendURL={backendURL} refreshEvent={refreshEvent} />
        </tr>
    );
};

export default EventRow;