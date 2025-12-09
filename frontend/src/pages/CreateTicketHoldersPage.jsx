// ####################################################################################
// frontend/src/pages/CreateTicketHoldersPage.jsx
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

export const CreateTicketHoldersPage = ({ backendURL }) => {
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const navigate = useNavigate();

    const addTicketHolder = async (e) => {
        e.preventDefault();
        const newTicketHolder = {fName, lName, email, phone};
        console.log(newTicketHolder);
        const response = await fetch(
            `${backendURL}/ticket-holders/create`, {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(newTicketHolder)
                }
        );

        if(response.ok){
            alert("Successfully added the ticket holder");
            navigate('/ticket-holders');
        } else{
            alert("Failed to add ticket holder, status code = " + response.status);
        }
    };

    return (
        <div>
            <h2>Create Ticket Holder</h2>
            <form onSubmit={addTicketHolder}>
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
                <label>Email: </label>
                <input
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <label>Phone: </label>
                <input
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                />
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateTicketHoldersPage;