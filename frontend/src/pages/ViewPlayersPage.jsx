import { useState, useEffect } from "react";
import PlayerRow from "../components/PlayerRow.jsx";
import CreatePlayerForm from "../components/CreatePlayerForm.jsx";
import UpdatePlayerForm from "../components/UpdatePlayerForm.jsx";

function ViewPlayersPage({ backendURL }) {
    const [players, setPlayers] = useState([]);

    const getData = async () => {
        try {
            const response = await fetch(`${backendURL}/view-players`);
            if (!response.ok) throw new Error(`Server error: ${response.status}`);
            const data = await response.json();
            setPlayers(data.players);
        } catch (error) {
            console.error("Error fetching players:", error);
        }
    };

    // Load table on page load
    useEffect(() => {
        getData();
    }, []);


    return (
        <>
            <h2>List of Players</h2>

            <table>
                <thead>
                    <tr>
                        {players.length > 0 && Object.keys(players[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {players.map((player, index) => (
                        <PlayerRow key={index} rowObject={player} backendURL={backendURL} refreshPlayer={getData}/>
                    ))}

                </tbody>
            </table>

            <CreatePlayerForm backendURL={backendURL} refreshPlayer={getData} />
            <UpdatePlayerForm players={players} backendURL={backendURL} refreshPlayers={getData} />
        </>
    );
}

export default ViewPlayersPage;