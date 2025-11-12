const UpdateEventForm = ({ events, backendURL, refreshEvent }) => {

    return (
        <>
        <h2>Update an Event</h2>
        <form className='cuForm'>
            <label htmlFor="update_event_id">Event to Update: </label>
            <select
                name="update_event_id"
                id="update_event_id"
            >
                <option value="">Select an Event</option>
                {events.map((event) => (
                    <option key={event.eventID} value={event.eventID}>
                        {event.eventID} - {event.visitingTeam} {event.eventStart}
                    </option>
                ))}
            </select>

            <label htmlFor="update_event_visiting">Visiting Team: </label>
            <input
                type="text"
                name="update_event_visiting"
                id="update_event_visiting"
            />

            <label htmlFor="update_event_start">Event Start: </label>
            <input
                type="datetime-local"
                name="update_event_start"
                id="update_event_start"
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default UpdateEventForm;