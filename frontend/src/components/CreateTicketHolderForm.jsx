const CreateTicketHolderForm = ({ backendURL, refreshTicketHolder }) => {

    return (
        <>
        <h2>Add a Ticket Holder</h2>

        <form className='cuForm'>
            <label htmlFor="create_ticketholder_fname">First Name: </label>
            <input
                type="text"
                name="create_ticketholder_fname"
                id="create_ticketholder_fname"
            />

            <label htmlFor="create_ticketholder_lname">Last Name: </label>
            <input
                type="text"
                name="create_ticketholder_lname"
                id="create_ticketholder_lname"
            />

            <label htmlFor="create_ticketholder_email">Email: </label>
            <input
                type="email"
                name="create_ticketholder_email"
                id="create_ticketholder_email"
            />

            <label htmlFor="create_ticketholder_phone">Phone Number: </label>
            <input
                type="tel"
                name="create_ticketholder_phone"
                id="create_ticketholder_phone"
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default CreateTicketHolderForm;
