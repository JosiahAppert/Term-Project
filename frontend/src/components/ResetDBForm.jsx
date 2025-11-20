const ResetDBForm = ({ backendURL }) => {
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await fetch(backendURL + '/reset-db', {
                method: 'POST'
            });

            if (response.ok) {
                console.log("Database reset successfully.");
            } else {
                console.error("Error resetting database.");
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <button type='submit'>
                    Reset Database
                </button>

            </form>
        </>

    );
};

export default ResetDBForm;