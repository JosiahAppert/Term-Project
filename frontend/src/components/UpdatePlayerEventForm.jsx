import { useState } from "react";

const UpdatePlayerEventForm = ({ playerEvents, events, players, backendURL, refreshPlayerEvent }) => {
    const [selectedPlayerEvent, setSelectedPlayerEvent] = useState(null);
    const [formData, setFormData] = useState({
        newEventID: "",
        newPlayerID: "",
        inningsPlayed: "",
        salaryPaid: ""
    });

    const handleSelectChange = (e) => {
        const eventKey = e.target.value;
        const pe = playerEvents.find((pe) => `${pe.eventID}-${pe.playerID}` === eventKey);
        setSelectedPlayerEvent(pe);

        setFormData({
            newEventID: pe?.eventID || "",
            newPlayerID: pe?.playerID || "",
            inningsPlayed: pe?.inningsPlayed || "",
            salaryPaid: pe?.salaryPaid || ""
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedPlayerEvent) return alert("Please select a player event to update.");
    };

    return (
        <>
            <h2>Update a Player Event</h2>
            <form className="cuForm" onSubmit={handleSubmit}>
                <label htmlFor="select_player_event">Select Player Event:</label>
                <select id="select_player_event" onChange={handleSelectChange}>
                    <option value="">Select an entry to update</option>
                    {playerEvents.map((pe) => {
                        const event = events.find((e) => e.eventID === pe.eventID);
                        const player = players.find((p) => p.playerID === pe.playerID);
                        const label = `${player?.fName || "?"} ${player?.lName || ""} - ${
                            event?.visitingTeam || "?"
                        } (${pe.eventID}, ${pe.playerID})`;
                        return (
                            <option
                                key={`${pe.eventID}-${pe.playerID}`}
                                value={`${pe.eventID}-${pe.playerID}`}
                            >
                                {label}
                            </option>
                        );
                    })}
                </select>

                {selectedPlayerEvent && (
                    <>
                        <label htmlFor="update_event_id">New Event:</label>
                        <select
                            id="update_event_id"
                            name="newEventID"
                            value={formData.newEventID}
                            onChange={handleChange}
                        >
                            {events.map((event) => (
                                <option key={event.eventID} value={event.eventID}>
                                    {event.eventID} - {event.visitingTeam}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="update_player_id">New Player:</label>
                        <select
                            id="update_player_id"
                            name="newPlayerID"
                            value={formData.newPlayerID}
                            onChange={handleChange}
                        >
                            {players.map((player) => (
                                <option key={player.playerID} value={player.playerID}>
                                    {player.playerID} - {player.fName} {player.lName}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="update_player_event_innings">Innings Played:</label>
                        <input
                            type="number"
                            id="update_player_event_innings"
                            name="inningsPlayed"
                            value={formData.inningsPlayed}
                            onChange={handleChange}
                        />

                        <label htmlFor="update_player_event_salary">Salary Paid:</label>
                        <input
                            type="number"
                            id="update_player_event_salary"
                            name="salaryPaid"
                            step="0.01"
                            value={formData.salaryPaid}
                            onChange={handleChange}
                        />

                        <input type="submit" value="Update" />
                    </>
                )}
            </form>
        </>
    );
};

export default UpdatePlayerEventForm;
