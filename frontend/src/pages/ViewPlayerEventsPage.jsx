import { useState, useEffect } from "react";
import PlayerEventRow from "../components/PlayerEventRow.jsx";
import CreatePlayerEventForm from "../components/CreatePlayerEventForm.jsx";
import UpdatePlayerEventForm from "../components/UpdatePlayerEventForm.jsx";

function ViewPlayerEventsPage({ backendURL }) {
    const [playerEvents, setPlayerEvents] = useState([]);
    const [events, setEvents] = useState([]);
    const [players, setPlayers] = useState([]);

    const getData = async () => {
        try {
            const [playerEventsRes, eventsRes, playersRes] = await Promise.all([
                fetch(`${backendURL}/view-player-events`),
                fetch(`${backendURL}/view-events`),
                fetch(`${backendURL}/view-players`)
            ]);

            const playerEventsData = await playerEventsRes.json();
            const eventsData = await eventsRes.json();
            const playersData = await playersRes.json();

            // handle either { playerEvents: [...] } or raw array shape
            setPlayerEvents(playerEventsData.playerEvents || playerEventsData);
            setEvents(eventsData.events || eventsData);
            setPlayers(playersData.players || playersData);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Load data when page mounts
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h2>List of Player Events</h2>

            <table>
                <thead>
                    <tr>
                        {playerEvents.length > 0 &&
                            Object.keys(playerEvents[0]).map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {playerEvents.map((playerEvent, index) => (
                        <PlayerEventRow
                            key={index}
                            rowObject={playerEvent}
                            backendURL={backendURL}
                            refreshPlayerEvent={getData}
                        />
                    ))}
                </tbody>
            </table>

            <CreatePlayerEventForm
                events={events}
                players={players}
                backendURL={backendURL}
                refreshPlayerEvent={getData}
            />

            <UpdatePlayerEventForm
                events={events}
                players={players}
                backendURL={backendURL}
                refreshPlayerEvent={getData}
            />
        </>
    );
}

export default ViewPlayerEventsPage;
