const UpdatePlayerForm = ({ players, backendURL, refreshPlayer }) => {

    return (
        <>
        <h2>Update a Player</h2>
        <form className='cuForm'>
            <label htmlFor="update_player_id">Player to Update: </label>
            <select
                name="update_player_id"
                id="update_player_id"
            >
                <option value="">Select a Player</option>
                {players.map((player) => (
                    <option key={player.playerID} value={player.playerID}>
                        {player.playerID} - {player.fName} {player.lName}
                    </option>
                ))}
            </select>

            <label htmlFor="update_player_fname">First Name: </label>
            <input
                type="text"
                name="update_player_fname"
                id="update_player_fname"
            />

            <label htmlFor="update_player_lname">Last Name: </label>
            <input
                type="text"
                name="update_player_lname"
                id="update_player_lname"
            />

            <label htmlFor="update_player_position">Position: </label>
            <input
                type="text"
                name="update_player_position"
                id="update_player_position"
            />

            <label htmlFor="update_player_salary">Salary: </label>
            <input
                type="number"
                name="update_player_salary"
                id="update_player_salary"
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default UpdatePlayerForm;