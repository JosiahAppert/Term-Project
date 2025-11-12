const CreateEventForm = ({ backendURL, refreshEvent }) => {

    return (
        <>
        <h2>Create an Event</h2>

        <form className='cuForm'>
            <label htmlFor="create_event_visiting">Visiting Team: </label>
            <input
                type="text"
                name="create_event_visiting"
                id="create_event_visiting"
            />

            <label htmlFor="create_event_start">Event Start: </label>
            <input
                type="datetime-local"
                name="create_event_start"
                id="create_event_start"
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default CreateEventForm;
