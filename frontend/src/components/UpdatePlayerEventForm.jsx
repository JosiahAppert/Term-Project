const UpdatePlayerEventForm = ({ events, players, backendURL, refreshPlayerEvent }) => {

    return (
        <>
        <h2>Update a Player Event</h2>
        <form className='cuForm'>
            <label htmlFor="update_player_event_eventID">Event to Update: </label>
            <select
                name="update_player_event_eventID"
                id="update_player_event_eventID"
            >
                <option value="">Select an Event</option>
                {events.map((event) => (
                    <option key={event.eventID} value={event.eventID}>
                        {event.eventID} - {event.visitingTeam} {event.eventStart}
                    </option>
                ))}
            </select>

            <label htmlFor="update_player_event_playerID">Player to Update: </label>
            <select
                name="update_player_event_playerID"
                id="update_player_event_playerID"
            >
                <option value="">Select a Player</option>
                {players.map((player) => (
                    <option key={player.playerID} value={player.playerID}>
                        {player.playerID} - {player.fName} {player.lName}
                    </option>
                ))}
            </select>

            <label htmlFor="update_player_event_innings">Innings Played: </label>
            <input
                type="number"
                name="update_player_event_innings"
                id="update_player_event_innings"
            />

            <label htmlFor="update_player_event_salary">Salary Paid: </label>
            <input
                type="number"
                name="update_player_event_salary"
                id="update_player_event_salary"
                step="0.01"
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default UpdatePlayerEventForm;