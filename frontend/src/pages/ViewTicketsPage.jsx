import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TicketRow from "../components/TicketRow.jsx";

function ViewTicketsPage({ backendURL, setTicketToEdit, setTicketHolderToEdit, setEventToEdit }) {
    const [events, setEvents] = useState([]);
    const [ticketHolders, setTicketHolders] = useState([]);
    const [tickets, setTickets] = useState([]);

    const navigate = useNavigate();

    const columnAliases = {
        ticketID: "Ticket ID",
        eventID: "Event ID",
        visitingTeam: "Visiting Team",
        price: "Price",
        ticketHolderID: "Ticket Holder ID",
        fName: "First Name",
        lName: "Last Name",
        seatNumber: "Seat Number"
    };

    const getData = async () => {
        try {
            const [ticketsRes, eventsRes, ticketHoldersRes] = await Promise.all([
                fetch(`${backendURL}/tickets`),
                fetch(`${backendURL}/events`),
                fetch(`${backendURL}/ticket-holders`)
            ]);

            const eventsData = await eventsRes.json();
            const ticketHoldersData = await ticketHoldersRes.json();
            const ticketsData = await ticketsRes.json();

            setTickets(ticketsData.tickets || ticketsData);
            setEvents(eventsData.events || eventsData);
            setTicketHolders(ticketHoldersData.ticketHolders || ticketHoldersData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const onCreate = async () => {
        setEventToEdit(events);
        setTicketHolderToEdit(ticketHolders);
        navigate("/tickets/create");
    };

    const onEdit = async ticketToEdit => {
        setEventToEdit(events);
        setTicketHolderToEdit(ticketHolders);
        setTicketToEdit(ticketToEdit);
        navigate("/tickets/update");
    };

    const onDelete = async ticketID => {
        const response = await fetch(`${backendURL}/tickets/${ticketID}`, { method: 'DELETE' });
        if (response.status === 204) {
            getData();
        } else {
            console.error(`Failed to delete ticket with id = ${ticketID}, status code = ${response.status}`)
        }
    }

    return (
        <>
            <h2>List of Tickets</h2>

            <table>
                <thead>
                    <tr>
                        {tickets.length > 0 && Object.keys(tickets[0]).map((header, index) => (
                            <th key={index}>
                                {columnAliases[header] || header}
                            </th>
                        ))}
                        <th>Edit/Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {tickets.map((ticket, index) => (
                        <TicketRow key={index} ticket={ticket} onEdit={onEdit} onDelete={onDelete} />
                    ))}
                </tbody>
            </table>
            <button onClick={onCreate}>Create Ticket</button>
        </>
    );
}

export default ViewTicketsPage;