const CreatePlayerEventForm = ({ events, players, backendURL, refreshPlayerEvent }) => {

    return (
        <>
        <h2>Create a Player Event</h2>

        <form className='cuForm'>
            <label htmlFor="create_player_event_eventID">Event: </label>
            <select
                name="create_player_event_eventID"
                id="create_player_event_eventID"
            >
                <option value="">Select an Event</option>
                <option value="NULL">&lt; None &gt;</option>
                {events.map((event, index) => (
                    <option value={event.id} key={index}>{event.visitingTeam} {event.eventStart}</option>
                ))}
            </select>

            <label htmlFor="create_player_event_playerID">Player: </label>
            <select
                name="create_player_event_playerID"
                id="create_player_event_playerID"
            >
                <option value="">Select a Player</option>
                <option value="NULL">&lt; None &gt;</option>
                {players.map((player, index) => (
                    <option value={player.id} key={index}>{player.fName} {player.lName}</option>
                ))}
            </select>
            
            <label htmlFor="create_player_event_innings">Innings Played: </label>
            <input
                type="number"
                name="create_player_event_innings"
                id="create_player_event_innings"
            />

            <label htmlFor="create_player_event_salary">Salary Paid: </label>
            <input
                type="number"
                name="create_player_event_salary"
                id="create_player_event_salary"
                step="0.01"
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default CreatePlayerEventForm;
