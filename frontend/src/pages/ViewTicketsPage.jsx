import { useState, useEffect } from "react";
import TicketRow from "../components/TicketRow.jsx";
import CreateTicketForm from "../components/CreateTicketForm.jsx";
import UpdateTicketForm from "../components/UpdateTicketForm.jsx";

function ViewTicketsPage({ backendURL }) {
    const [tickets, setTickets] = useState([]);
    const [events, setEvents] = useState([]);
    const [ticketHolders, setTicketHolders] = useState([]);

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
                fetch(`${backendURL}/view-ticket-events`),
                fetch(`${backendURL}/events`),
                fetch(`${backendURL}/ticket-holders`)
            ]);

            const ticketsData = await ticketsRes.json();
            const eventsData = await eventsRes.json();
            const ticketHoldersData = await ticketHoldersRes.json();

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

    return (
        <>
            <h2>List of Tickets</h2>

            <table>
                <thead>
                    <tr>
                        {tickets.length > 0 &&
                            Object.keys(tickets[0]).map((header, index) => (
                                <th key={index}>
                                    {columnAliases[header] || header}</th>
                            ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {tickets.map((ticket, index) => (
                        <TicketRow
                            key={index}
                            rowObject={ticket}
                            backendURL={backendURL}
                            refreshTicket={getData}
                        />
                    ))}
                </tbody>
            </table>

            <CreateTicketForm
                events={events}
                ticketHolders={ticketHolders}
                backendURL={backendURL}
                refreshTicket={getData}
            />

            <UpdateTicketForm
                tickets={tickets}
                events={events}
                ticketHolders={ticketHolders}
                backendURL={backendURL}
                refreshTicket={getData}
            />
        </>
    );
}

export default ViewTicketsPage;
