import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const EditTicketHoldersPage = ({ backendURL, ticketHolderToEdit }) => {
    const [fName, setFName] = useState(ticketHolderToEdit.fName);
    const [lName, setLName] = useState(ticketHolderToEdit.lName);
    const [email, setEmail] = useState(ticketHolderToEdit.email);
    const [phone, setPhone] = useState(ticketHolderToEdit.phone);

    const navigate = useNavigate();

    const editTicketHolder = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${backendURL}/ticket-holders/update/${ticketHolderToEdit.ticketHolderID}`, {
                method: 'PUT', // or 'POST' if your backend expects that
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: ticketHolderToEdit.ticketHolderID,
                    fName,
                    lName,
                    email,
                    phone,
                }),
            });

            if (response.ok) {
                console.log("Ticket holder updated successfully.");
                alert("Ticket holder updated successfully.");
            } else {
                const errorData = await response.json();
                console.error("Error updating ticket holder:", errorData);
                alert("Error updating ticket holder:", errorData);
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
        navigate('/ticket-holders');
    };

    return (
        <div>
            <h2>Edit Ticket Holder</h2>
            <form onSubmit={editTicketHolder}>
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
                <label>Email</label>
                <input
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <label>Phone</label>
                <input
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditTicketHoldersPage;