import { useState, useEffect } from "react";
import TicketHolderRow from "../components/TicketHolderRow.jsx";
import CreateTicketHolderForm from "../components/CreateTicketHolderForm.jsx";
import UpdateTicketHolderForm from "../components/UpdateTicketHolderForm.jsx";

function ViewTicketHoldersPage({ backendURL }) {
    const [ticketHolders, setTicketHolders] = useState([]);

    const getData = async () => {
        try {
            const response = await fetch(`${backendURL}/view-ticket-holders`);
            if (!response.ok) throw new Error(`Server error: ${response.status}`);
            const data = await response.json();
            setTicketHolders(data.ticketHolders);
        } catch (error) {
            console.error("Error fetching ticket holders:", error);
        }
    };

    // Load table on page load
    useEffect(() => {
        getData();
    }, []);


    return (
        <>
            <h2>List of Ticket Holders</h2>

            <table>
                <thead>
                    <tr>
                        {ticketHolders.length > 0 && Object.keys(ticketHolders[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {ticketHolders.map((ticketHolder, index) => (
                        <TicketHolderRow key={index} rowObject={ticketHolder} backendURL={backendURL} refreshTicketHolder={getData}/>
                    ))}

                </tbody>
            </table>

            <CreateTicketHolderForm backendURL={backendURL} refreshTicketHolder={getData} />
            <UpdateTicketHolderForm ticketHolders={ticketHolders} backendURL={backendURL} refreshTicketHolders={getData} />
        </>
    );
}

export default ViewTicketHoldersPage;