import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const EditPlayerEventsPage = ({ backendURL, playerEventToEdit }) => {
    const [eventID, setEventID] = useState(playerEventToEdit.eventID);
    const [playerID, setPlayerID] = useState(playerEventToEdit.playerID);
    const [inningsplayed, setInningsPlayed] = useState(playerEventToEdit.inningsplayed);
    const [salary, setSalary] = useState(playerEventToEdit.salary);

    const navigate = useNavigate();

    const editPlayerEvent = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${backendURL}/player-events/update/${playerEventToEdit.eventID}/${playerEventToEdit.playerID}`, {
                method: 'PUT', // or 'POST' if your backend expects that
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    eventID: playerEventToEdit.eventID,
                    playerID: playerEventToEdit.playerID,
                    inningsplayed,
                    salary,
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
                <label>Event ID: </label>
                <input
                    type="text"
                    value={eventID}
                    onChange={e => setEventID(e.target.value)}
                />
                <label>Player ID: </label>
                <input
                    type="text"
                    value={playerID}
                    onChange={e => setPlayerID(e.target.value)}
                />
                <label>Innings Played: </label>
                <input
                    type="text"
                    value={inningsplayed}
                    onChange={e => setInningsPlayed(e.target.value)}
                />
                <label>Salary: </label>
                <input
                    type="text"
                    value={salary}
                    onChange={e => setSalary(e.target.value)}
                />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditPlayerEventsPage;