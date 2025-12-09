// ####################################################################################
// frontend/src/pages/CreatePlayersPage.jsx
// Citations for the following code:
//   Adapted from the following sources:
//   1. Exploration - Web Application Technology
//      https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-
//         application-technology-2?module_item_id=25645131
//   2. Exploration - Implementing CUD operations in your app
//      https://canvas.oregonstate.edu/courses/2017561/pages/exploration-implementing-
//         cud-operations-in-your-app?module_item_id=25645149
// ####################################################################################
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreatePlayersPage = ({ backendURL }) => {
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [position, setPosition] = useState('');
    const [salary, setSalary] = useState(0);

    const navigate = useNavigate();

    const addPlayer = async (e) => {
        e.preventDefault();
        const newPlayer = {fName, lName, position, salary};
        console.log(newPlayer);
        const response = await fetch(
            `${backendURL}/players/create`, {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(newPlayer)
                }
        );

        if(response.ok){
            alert("Successfully added the player");
            navigate('/players');
        } else{
            alert("Failed to add player, status code = " + response.status);
        }
    };

    return (
        <div>
            <h2>Create Player</h2>
            <form onSubmit={addPlayer}>
                <label>First Name: </label>
                <input
                    type="text"
                    value={fName}
                    onChange={e => setFName(e.target.value)}
                />
                <label>Last Name: </label>
                <input
                    type="text"
                    value={lName}
                    onChange={e => setLName(e.target.value)}
                />
                <label>Position: </label>
                <input
                    type="text"
                    value={position}
                    onChange={e => setPosition(e.target.value)}
                />
                <label>Salary: </label>
                <input
                    type="number"
                    value={salary}
                    onChange={e => setSalary(e.target.value)}
                />
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreatePlayersPage;