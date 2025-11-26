import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlayerRow from "../components/PlayerRow.jsx";

function ViewPlayersPage({ backendURL, setPlayerToEdit }) {
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate();

    const columnAliases = {
        playerID: "Player ID",
        fName: "First Name",
        lName: "Last Name",
        position: "Position",
        salary: "Salary"
    };

    const getData = async () => {
        try {
            const response = await fetch(`${backendURL}/players`);
            if (!response.ok) throw new Error(`Server error: ${response.status}`);
            const data = await response.json();
            setPlayers(data.players);
        } catch (error) {
            console.error("Error fetching players:", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const onCreate = async () => {
        navigate("/players/create");
    };

    const onEdit = async playerToEdit => {
        setPlayerToEdit(playerToEdit);
        navigate("/players/update");
    };

    const onDelete = async playerID => {
        const response = await fetch(`${backendURL}/players/${playerID}`, { method: 'DELETE' });
        if (response.status === 204) {
            getData();
        } else {
            console.error(`Failed to delete player with id = ${playerID}, status code = ${response.status}`)
        }
    }

    return (
        <>
            <h2>List of Players</h2>

            <table>
                <thead>
                    <tr>
                        {players.length > 0 && Object.keys(players[0]).map((header, index) => (
                            <th key={index}>
                                {columnAliases[header] || header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {players.map((player, index) => (
                        <PlayerRow key={index} player={player} onEdit={onEdit} onDelete={onDelete} />
                    ))}
                </tbody>
            </table>
            <button onClick={onCreate}>Create Player</button>
        </>
    );
}

export default ViewPlayersPage;