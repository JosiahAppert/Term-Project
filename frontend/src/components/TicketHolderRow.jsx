import DeleteTicketHolderForm from "./DeleteTicketHolderForm";

const TicketHolderRow = ({ rowObject, backendURL, refreshTicketHolder }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            
            <DeleteTicketHolderForm rowObject={rowObject} backendURL={backendURL} refreshTicketHolder={refreshTicketHolder} />
        </tr>
    );
};

export default TicketHolderRow;