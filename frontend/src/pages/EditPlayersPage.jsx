// ####################################################################################
// frontend/src/pages/EditPlayersPage.jsx
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

export const EditPlayersPage = ({ backendURL, playerToEdit }) => {
    const [fName, setFName] = useState(playerToEdit.fName);
    const [lName, setLName] = useState(playerToEdit.lName);
    const [position, setPosition] = useState(playerToEdit.position);
    const [salary, setSalary] = useState(playerToEdit.salary);

    const navigate = useNavigate();

    const editPlayer = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${backendURL}/players/update/${playerToEdit.playerID}`, {
                method: 'PUT', // or 'POST' if your backend expects that
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: playerToEdit.playerID,
                    fName,
                    lName,
                    position,
                    salary,
                }),
            });

            if (response.ok) {
                console.log("Player updated successfully.");
                alert("Player updated successfully.");
            } else {
                const errorData = await response.json();
                console.error("Error updating player:", errorData);
                alert("Error updating player:", errorData);
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
        navigate('/players');
    };

    return (
        <div>
            <h2>Edit Player</h2>
            <form onSubmit={editPlayer}>
                <label>First Name</label>
                <input
                    type="text"
                    value={fName}
                    onChange={e => setFName(e.target.value)}
                />
                <label>Last Name</label>
                <input
                    type="text"
                    value={lName}
                    onChange={e => setLName(e.target.value)}
                />
                <label>Position</label>
                <input
                    type="text"
                    value={position}
                    onChange={e => setPosition(e.target.value)}
                />
                <label>Salary</label>
                <input
                    type="number"
                    value={salary}
                    onChange={e => setSalary(e.target.value)}
                />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditPlayersPage;