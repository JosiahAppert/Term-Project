import DeleteTicketForm from "./DeleteTicketForm";

const TicketRow = ({ rowObject, backendURL, refreshTicket }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            
            <DeleteTicketForm rowObject={rowObject} backendURL={backendURL} refreshTicket={refreshTicket} />
        </tr>
    );
};

export default TicketRow;