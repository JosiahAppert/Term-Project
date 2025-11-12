const CreateTicketForm = ({ events, ticketHolders, backendURL, refreshTicket }) => {

    return (
        <>
        <h2>Create a Ticket</h2>

        <form className='cuForm'>
            <label htmlFor="create_ticket_eventID">Event: </label>
            <select
                name="create_ticket_eventID"
                id="create_ticket_eventID"
            >
                <option value="">Select an Event</option>
                <option value="NULL">&lt; None &gt;</option>
                {events.map((event, index) => (
                    <option value={event.eventID} key={index}>{event.visitingTeam} {event.eventStart}</option>
                ))}
            </select>

            <label htmlFor="create_ticket_ticketholderID">Ticket Holder: </label>
            <select
                name="create_ticket_ticketholderID"
                id="create_ticket_ticketholderID"
            >
                <option value="">Select a Ticket Holder</option>
                <option value="NULL">&lt; None &gt;</option>
                {ticketHolders.map((holder, index) => (
                    <option value={holder.id} key={index}>{holder.fName} {holder.lName}</option>
                ))}
            </select>

            <label htmlFor="create_ticket_price">Price: </label>
            <input
                type="number"
                name="create_ticket_price"
                id="create_ticket_price"
                step="0.01"
            />

            <label htmlFor="create_ticket_seatNumber">Seat Number: </label>
            <input
                type="text"
                name="create_ticket_seatNumber"
                id="create_ticket_seatNumber"
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default CreateTicketForm;
