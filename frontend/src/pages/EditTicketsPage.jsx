import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const EditTicketsPage = ({ backendURL, events, ticketHolders, ticketToEdit }) => {
    const [eventID, setEventID] = useState(ticketToEdit.eventID);
    const [ticketHolderID, setTicketHolderID] = useState(ticketToEdit.ticketHolderID);
    const [price, setPrice] = useState(ticketToEdit.price ?? 0);
    const [seatNumber, setSeatNumber] = useState(ticketToEdit.seatNumber ?? 0);

    const navigate = useNavigate();

    const editTicket = async (e) => {
        e.preventDefault();
        if (!eventID || !ticketHolderID) {
            alert("Event and Ticket Holder must be selected.");
            return;
        }

        try {
            const response = await fetch(`${backendURL}/tickets/update/${ticketToEdit.ticketID}`, {
                method: 'PUT', // or 'POST' if your backend expects that
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ticketID: Number(ticketID),
                    eventID: Number(eventID),
                    price: price === "" ? null : Number(price),
                    ticketHolderID: Number(ticketHolderID),
                    seatNumber: seatNumber === "" ? null : Number(seatNumber),
                }),
            });

            if (response.ok) {
                console.log("Ticket updated successfully.");
                alert("Ticket updated successfully.");
            } else {
                const errorData = await response.json();
                console.error("Error updating ticket:", errorData);
                alert("Error updating ticket:", errorData);
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
        navigate('/tickets');
    };

    return (
        <div>
            <h2>Edit Ticket</h2>
            <form onSubmit={editTicket}>
                <label>Event: </label>
                <select value={eventID} onChange={e => setEventID(Number(e.target.value))}>
                    <option value="">Select an Event</option>
                    {events.map((event) => (
                        <option value={event.eventID} key={event.eventID}>{event.visitingTeam} {event.eventStart}</option>
                    ))}
                </select>
                <label>Price: </label>
                <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    min={0}
                />
                <label>Ticket Holder: </label>
                <select value={ticketHolderID} onChange={e => setTicketHolderID(Number(e.target.value))}>
                    <option value="">Select a Ticket Holder</option>
                    {ticketHolders.map((player) => (
                        <option value={player.playerID} key={player.playerID}>{player.fName} {player.lName}</option>
                    ))}
                </select>
                <label>Seat Number: </label>
                <input
                    type="number"
                    value={seatNumber}
                    onChange={e => setSeatNumber(e.target.value)}
                    min={0}
                />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditTicketsPage;