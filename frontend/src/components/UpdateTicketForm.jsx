const UpdateTicketForm = ({ events, ticketHolders, backendURL, refreshTicket }) => {

    return (
        <>
        <h2>Update a Ticket</h2>
        <form className='cuForm'>

            <label htmlFor="update_ticket_eventID">Event: </label>
            <select
                name="update_ticket_eventID"
                id="update_ticket_eventID"
            >
                <option value="">Select an Event</option>
                {events.map((event) => (
                    <option key={event.eventID} value={event.eventID}>
                        {event.eventID} - {event.visitingTeam} {event.eventStart}
                    </option>
                ))}
            </select>

            <label htmlFor="update_ticket_ticketholderID">Ticket Holder: </label>
            <select
                name="update_ticket_ticketholderID"
                id="update_ticket_ticketholderID"
            >
                <option value="">Select a Ticket Holder</option>
                {ticketHolders.map((holder) => (
                    <option key={holder.ticketHolderID} value={holder.ticketHolderID}>
                        {holder.ticketHolderID} - {holder.fName} {holder.lName}
                    </option>
                ))}
            </select>

            <label htmlFor="update_ticket_price">Price: </label>
            <input
                type="number"
                name="update_ticket_price"
                id="update_ticket_price"
                step="0.01"
            />

            <label htmlFor="update_ticket_seatNumber">Seat Number: </label>
            <input
                type="text"
                name="update_ticket_seatNumber"
                id="update_ticket_seatNumber"
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default UpdateTicketForm;