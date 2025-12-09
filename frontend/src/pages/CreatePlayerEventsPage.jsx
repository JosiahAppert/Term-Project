// ####################################################################################
// frontend/src/pages/CreatePlayerEventsPage.jsx
// Citations for the following code:
//   Adapted from the following sources:
//   1. Exploration - Web Application Technology
//      Date: November 3, 2025
//      https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-
//         application-technology-2?module_item_id=25645131
//   2. Exploration - Implementing CUD operations in your app
//      Date: November 19, 2025
//      https://canvas.oregonstate.edu/courses/2017561/pages/exploration-implementing-
//         cud-operations-in-your-app?module_item_id=25645149
// ####################################################################################
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreatePlayerEventsPage = ({ backendURL, events, players }) => {
    const [eventID, setEventID] = useState("");
    const [playerID, setPlayerID] = useState("");
    const [inningsPlayed, setInningsPlayed] = useState("");
    const [salaryPaid, setSalaryPaid] = useState("");

    const navigate = useNavigate();

    const addPlayerEvent = async (e) => {
        e.preventDefault();
        const newPlayerEvent = {eventID, playerID, inningsPlayed, salaryPaid};
        console.log(newPlayerEvent);
        const response = await fetch(
            `${backendURL}/player-events/create`, {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(newPlayerEvent)
                }
        );

        if(response.ok){
            alert("Successfully added the player event");
            navigate('/player-events');
        } else{
            alert("Failed to add player event, status code = " + response.status);
        }
    };

    return (
        <div>
            <h2>Create Player Event</h2>
            <form onSubmit={addPlayerEvent}>
                <label>Event: </label>
                <select value={eventID} onChange={e => setEventID(Number(e.target.value))}>
                    <option value="">Select an Event</option>
                    {events.map((event, index) => (
                        <option value={event.eventID} key={index}>{event.visitingTeam} {event.eventStart}</option>
                    ))}
                </select>
                <label>Player: </label>
                <select value={playerID} onChange={e => setPlayerID(Number(e.target.value))}>
                    <option value="">Select a Player</option>
                    {players.map((player, index) => (
                        <option value={player.playerID} key={index}>{player.fName} {player.lName}</option>
                    ))}
                </select>
                <label>Innings Played: </label>
                <input
                    type="number"
                    value={inningsPlayed}
                    onChange={e => setInningsPlayed(Number(e.target.value))}
                />
                <label>Salary Paid: </label>
                <input
                    type="number"
                    value={salaryPaid}
                    onChange={e => setSalaryPaid(Number(e.target.value))}
                />
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreatePlayerEventsPage;