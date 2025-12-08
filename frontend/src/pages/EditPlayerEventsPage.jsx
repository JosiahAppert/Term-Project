import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const EditPlayerEventsPage = ({ backendURL, events, players, playerEventToEdit }) => {
    const [eventID, setEventID] = useState(playerEventToEdit.eventID);
    const [playerID, setPlayerID] = useState(playerEventToEdit.playerID);
    const [inningsPlayed, setInningsPlayed] = useState(playerEventToEdit.inningsPlayed ?? 0);
    const [salaryPaid, setSalaryPaid] = useState(playerEventToEdit.salaryPaid ?? 0);

    const navigate = useNavigate();

    const editPlayerEvent = async (e) => {
        e.preventDefault();
        if (!eventID || !playerID) {
            alert("Event and Player must be selected.");
            return;
        }

        try {
            const response = await fetch(`${backendURL}/player-events/update/${playerEventToEdit.eventID}/${playerEventToEdit.playerID}`, {
                method: 'PUT', // or 'POST' if your backend expects that
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newEventID: Number(eventID),
                    newPlayerID: Number(playerID),
                    inningsPlayed: inningsPlayed === "" ? null : Number(inningsPlayed),
                    salaryPaid: salaryPaid === "" ? null : Number(salaryPaid),
                }),
            });

            if (response.ok) {
                console.log("Player event updated successfully.");
                alert("Player event updated successfully.");
            } else {
                const errorData = await response.json();
                console.error("Error updating player event:", errorData);
                alert("Error updating player event:", errorData);
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
        navigate('/player-events');
    };

    return (
        <div>
            <h2>Edit Player Event</h2>
            <form onSubmit={editPlayerEvent}>
                <label>Event: </label>
                <select value={eventID} onChange={e => setEventID(Number(e.target.value))}>
                    <option value="">Select an Event</option>
                    {events.map((event) => (
                        <option value={event.eventID} key={event.eventID}>{event.visitingTeam} {event.eventStart}</option>
                    ))}
                </select>
                <label>Player: </label>
                <select value={playerID} onChange={e => setPlayerID(Number(e.target.value))}>
                    <option value="">Select a Player</option>
                    {players.map((player) => (
                        <option value={player.playerID} key={player.playerID}>{player.fName} {player.lName}</option>
                    ))}
                </select>
                <label>Innings Played: </label>
                <input
                    type="number"
                    value={inningsPlayed}
                    onChange={e => setInningsPlayed(e.target.value)}
                    min={0}
                />
                <label>Salary Paid: </label>
                <input
                    type="number"
                    value={salaryPaid}
                    onChange={e => setSalaryPaid(e.target.value)}
                    min={0}
                />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditPlayerEventsPage;