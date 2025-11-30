import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlayerEventRow from "../components/PlayerEventRow.jsx";

function ViewPlayerEventsPage({ backendURL, setPlayerEventToEdit }) {
    const [events, setEvents] = useState([]);
    const [players, setPlayers] = useState([]);
    const [playerEvents, setPlayerEvents] = useState([]);

    const navigate = useNavigate();

    const columnAliases = {
        eventID: "Event ID",
        playerID: "Player ID",
        inningsPlayed: "Innings Played",
        salaryPaid: "Salary Paid",
        fName: "First Name",
        lName: "Last Name",
        teamName: "Team Name",
        eventStart: "Event Start"
    };

    const getData = async () => {
        try {
            const [playerEventsRes, eventsRes, playersRes] = await Promise.all([
                fetch(`${backendURL}/player-events`),
                fetch(`${backendURL}/events`),
                fetch(`${backendURL}/players`)
            ]);

            const eventsData = await eventsRes.json();
            const playersData = await playersRes.json();
            const playerEventsData = await playerEventsRes.json();

            setPlayerEvents(playerEventsData.playerEvents || playerEventsData);
            setEvents(eventsData.events || eventsData);
            setPlayers(playersData.players || playersData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const onCreate = async () => {
        navigate("/player-events/create");
    };

    const onEdit = async playerEventToEdit => {
        setPlayerEventToEdit(playerEventToEdit);
        navigate("/player-events/update");
    };

    const onDelete = async (eventID, playerID) => {
        const response = await fetch(`${backendURL}/events/${eventID}/${playerID}`, { method: 'DELETE' });
        if (response.status === 204) {
            getData();
        } else {
            console.error(`Failed to delete player event with id = ${eventID}${playerID}, status code = ${response.status}`)
        }
    }

    return (
        <>
            <h2>List of Player Events</h2>

            <table>
                <thead>
                    <tr>
                        {playerEvents.length > 0 && Object.keys(playerEvents[0]).map((header, index) => (
                            <th key={index}>
                                {columnAliases[header] || header}
                            </th>
                        ))}
                        <th>Edit/Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {playerEvents.map((playerEvent, index) => (
                        <PlayerEventRow key={index} playerEvent={playerEvent} onEdit={onEdit} onDelete={onDelete} />
                    ))}
                </tbody>
            </table>
            <button onClick={onCreate}>Create Player Event</button>
        </>
    );
}

export default ViewPlayerEventsPage;
