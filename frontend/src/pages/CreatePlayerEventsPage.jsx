import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreatePlayerEventsPage = ({ backendURL }) => {
    const [eventID, setEventID] = useState('');
    const [playerID, setPlayerID] = useState('');
    const [inningsPlayed, setInningsPlayed] = useState('');
    const [salary, setSalary] = useState('');

    const navigate = useNavigate();

    const addPlayerEvent = async (e) => {
        e.preventDefault();
        const newPlayerEvent = {eventID, playerID, inningsPlayed, salary};
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
                <label>Event ID</label>
                <input
                    type="text"
                    value={eventID}
                    onChange={e => setEventID(e.target.value)}
                />
                <label>Player ID</label>
                <input
                    type="text"
                    value={playerID}
                    onChange={e => setPlayerID(e.target.value)}
                />
                <label>Innings Played</label>
                <input
                    type="text"
                    value={inningsPlayed}
                    onChange={e => setInningsPlayed(e.target.value)}
                />
                <label>Salary</label>
                <input
                    type="text"
                    value={salary}
                    onChange={e => setSalary(e.target.value)}
                />
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreatePlayerEventsPage;