// ####################################################################################
// frontend/src/pages/CreateTicketsPage.jsx
// Citations for the following code:
//   Adapted from the following sources:
//   1. Exploration - Web Application Technology
//      https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-
//         application-technology-2?module_item_id=25645131
//   2. Exploration - Implementing CUD operations in your app
//      https://canvas.oregonstate.edu/courses/2017561/pages/exploration-implementing-
//         cud-operations-in-your-app?module_item_id=25645149
// ####################################################################################
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateTicketsPage = ({ backendURL, events, ticketHolders }) => {
    const [eventID, setEventID] = useState('');
    const [price, setPrice] = useState('');
    const [ticketHolderID, setTicketHolderID] = useState('');
    const [seatNumber, setSeatNumber] = useState('');

    const navigate = useNavigate();

    const addTicket = async (e) => {
        e.preventDefault();
        const newTicket = {eventID, price, ticketHolderID, seatNumber};
        console.log(newTicket);
        const response = await fetch(
            `${backendURL}/tickets/create`, {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(newTicket)
                }
        );

        if(response.ok){
            alert("Successfully added the ticket");
            navigate('/tickets');
        } else{
            alert("Failed to add ticket, status code = " + response.status);
        }
    };

    return (
        <div>
            <h2>Create Ticket</h2>
            <form onSubmit={addTicket}>
                <label>Event: </label>
                <select value={eventID} onChange={e => setEventID(Number(e.target.value))}>
                    <option value="">Select an Event</option>
                    {events.map((event, index) => (
                        <option value={event.eventID} key={index}>{event.visitingTeam} {event.eventStart}</option>
                    ))}
                </select>
                <label>Price: </label>
                <input
                    type="text"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
                <label>Ticket Holder: </label>
                <select value={ticketHolderID} onChange={e => setTicketHolderID(Number(e.target.value))}>
                    <option value="">Select a Ticket Holder</option>
                    {ticketHolders.map((holder, index) => (
                        <option value={holder.ticketHolderID} key={index}>{holder.fName} {holder.lName}</option>
                    ))}
                </select>
                <label>Seat Number: </label>
                <input
                    type="text"
                    value={seatNumber}
                    onChange={e => setSeatNumber(e.target.value)}
                />
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateTicketsPage;