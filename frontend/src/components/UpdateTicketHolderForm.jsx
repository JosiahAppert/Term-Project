const UpdateTicketHolderForm = ({ ticketHolders, backendURL, refreshTicketHolder }) => {

    return (
        <>
        <h2>Update a Ticket Holder</h2>
        <form className='cuForm'>
            <label htmlFor="update_ticketholder_id">Ticket Holder to Update: </label>
            <select
                name="update_ticketholder_id"
                id="update_ticketholder_id"
            >
                <option value="">Select a Ticket Holder</option>
                {ticketHolders.map((ticketHolder) => (
                    <option key={ticketHolder.ticketHolderID} value={ticketHolder.ticketHolderID}>
                        {ticketHolder.ticketHolderID} - {ticketHolder.fName} {ticketHolder.lName}
                    </option>
                ))}
            </select>

            <label htmlFor="update_ticketholder_fname">First Name: </label>
            <input
                type="text"
                name="update_ticketholder_fname"
                id="update_ticketholder_fname"
            />

            <label htmlFor="update_ticketholder_lname">Last Name: </label>
            <input
                type="text"
                name="update_ticketholder_lname"
                id="update_ticketholder_lname"
            />

            <label htmlFor="update_ticketholder_email">Email: </label>
            <input
                type="email"
                name="update_ticketholder_email"
                id="update_ticketholder_email"
            />

            <label htmlFor="update_ticketholder_phone">Phone Number: </label>
            <input
                type="tel"
                name="update_ticketholder_phone"
                id="update_ticketholder_phone"
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default UpdateTicketHolderForm;