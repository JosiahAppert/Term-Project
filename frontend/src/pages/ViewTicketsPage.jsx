import { useState, useEffect } from "react";
import TicketRow from "../components/TicketRow.jsx";
import CreateTicketForm from "../components/CreateTicketForm.jsx";
import UpdateTicketForm from "../components/UpdateTicketForm.jsx";

function ViewTicketsPage({ backendURL }) {
    const [ticketEvents, setTicketEvents] = useState([]);
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
            const [ticketEventsRes, eventsRes, ticketHoldersRes] = await Promise.all([
                fetch(`${backendURL}/view-ticket-events`),
                fetch(`${backendURL}/view-events`),
                fetch(`${backendURL}/view-ticket-holders`)
            ]);

            const ticketEventsData = await ticketEventsRes.json();
            const eventsData = await eventsRes.json();
            const ticketHoldersData = await ticketHoldersRes.json();

            // handle either { ticketEvents: [...] } or raw array shape
            setTicketEvents(ticketEventsData.ticketEvents || ticketEventsData);
            setEvents(eventsData.events || eventsData);
            setTicketHolders(ticketHoldersData.ticketHolders || ticketHoldersData);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Load data when page mounts
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h2>List of Tickets</h2>

            <table>
                <thead>
                    <tr>
                        {ticketEvents.length > 0 &&
                            Object.keys(ticketEvents[0]).map((header, index) => (
                                <th key={index}>
                                    {columnAliases[header] || header}</th>
                            ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {ticketEvents.map((ticketEvent, index) => (
                        <TicketRow
                            key={index}
                            rowObject={ticketEvent}
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
                events={events}
                ticketHolders={ticketHolders}
                backendURL={backendURL}
                refreshTicket={getData}
            />
        </>
    );
}

export default ViewTicketsPage;
