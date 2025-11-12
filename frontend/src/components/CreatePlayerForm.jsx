const CreatePlayerForm = ({ backendURL, refreshPlayer }) => {

    return (
        <>
        <h2>Add a Player</h2>

        <form className='cuForm'>
            <label htmlFor="create_player_fname">First Name: </label>
            <input
                type="text"
                name="create_player_fname"
                id="create_player_fname"
            />

            <label htmlFor="create_player_lname">Last Name: </label>
            <input
                type="text"
                name="create_player_lname"
                id="create_player_lname"
            />

            <label htmlFor="create_player_position">Position: </label>
            <input
                type="text"
                name="create_player_position"
                id="create_player_position"
            />

            <label htmlFor="create_player_salary">Salary: </label>
            <input
                type="number"
                name="create_player_salary"
                id="create_player_salary"
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default CreatePlayerForm;
