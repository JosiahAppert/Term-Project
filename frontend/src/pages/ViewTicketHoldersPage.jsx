// ###############################################################################
// frontend/src/pages/ViewTicketHoldersPage.jsx
// Citations for the following code:
//   Adapted from the following sources:
//   1. Exploration - Web Application Technology
//        https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-
//           application-technology-2?module_item_id=25645131
// ###############################################################################
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TicketHolderRow from "../components/TicketHolderRow.jsx";

function ViewTicketHoldersPage({ backendURL, setTicketHolderToEdit }) {
    const [ticketHolders, setTicketHolders] = useState([]);
    const navigate = useNavigate();

    const columnAliases = {
        ticketHolderID: "Ticket Holder ID",
        fName: "First Name",
        lName: "Last Name",
        email: "Email",
        phone: "Phone Number"
    };

    const getData = async () => {
        try {
            const response = await fetch(`${backendURL}/ticket-holders`);
            if (!response.ok) throw new Error(`Server error: ${response.status}`);
            const data = await response.json();
            setTicketHolders(data.ticketHolders);
        } catch (error) {
            console.error("Error fetching ticket holders:", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const onCreate = async () => {
        navigate("/ticket-holders/create");
    };

    const onEdit = async ticketHolderToEdit => {
        setTicketHolderToEdit(ticketHolderToEdit);
        navigate("/ticket-holders/update");
    };

    const onDelete = async ticketHolderID => {
        const response = await fetch(`${backendURL}/ticket-holders/${ticketHolderID}`, { method: 'DELETE' });
        if (response.status === 204) {
            getData();
        } else {
            console.error(`Failed to delete ticket holder with id = ${ticketHolderID}, status code = ${response.status}`)
        }
    }

    return (
        <>
            <h2>List of Ticket Holders</h2>

            <table>
                <thead>
                    <tr>
                        {ticketHolders.length > 0 && Object.keys(ticketHolders[0]).map((header, index) => (
                            <th key={index}>
                                {columnAliases[header] || header}</th>
                        ))}
                        <th>Edit/Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {ticketHolders.map((ticketHolder, index) => (
                        <TicketHolderRow key={index} ticketHolder={ticketHolder} onEdit={onEdit} onDelete={onDelete} />
                    ))}
                </tbody>
            </table>
            <button onClick={onCreate}>Create Ticket Holder</button>
        </>
    );
}

export default ViewTicketHoldersPage;