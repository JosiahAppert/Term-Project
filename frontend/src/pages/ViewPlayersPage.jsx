// ###############################################################################
// frontend/src/pages/ViewPlayersPage.jsx
// Citations for the following code:
//   Adapted from the following sources:
//   1. Exploration - Web Application Technology
//        https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-
//           application-technology-2?module_item_id=25645131
// ###############################################################################
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
                        <th>Edit/Delete</th>
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