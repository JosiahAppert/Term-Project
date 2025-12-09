// ####################################################################################
// ResetDBForm.jsx
// Citations for the following code:
//    Adapted from the following sources:
//    1. Exploration - MySQL Cascade
//       Date: October 30, 2025
//       https://canvas.oregonstate.edu/courses/2017561/pages/exploration-mysql-
//          cascade
//    2. Bulk Data Loading for InnoDB Tables
//       Date: October 30, 2025
//       https://dev.mysql.com/doc/refman/8.0/en/optimizing-innodb-bulk-data-
//          loading.html
// ####################################################################################
const ResetDBForm = ({ backendURL }) => {
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await fetch(backendURL + '/reset-db', {
                method: 'POST'
            });

            if (response.ok) {
                console.log("Database reset successfully.");
                alert("Database reset successfully.");
                window.location.reload();
            } else {
                console.error("Error resetting database.");
                alert("Error resetting database.");
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