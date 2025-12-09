// ####################################################################################
// frontend/src/pages/EditEventsPage.jsx
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

export const EditEventsPage = ({ backendURL, eventToEdit }) => {
    const [visitingTeam, setVisitingTeam] = useState(eventToEdit.visitingTeam);
    const [eventStart, setEventStart] = useState(eventToEdit.eventStart);

    const navigate = useNavigate();

    const editEvent = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${backendURL}/events/update/${eventToEdit.eventID}`, {
                method: 'PUT', // or 'POST' if your backend expects that
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: eventToEdit.eventID,
                    visitingTeam,
                    eventStart,
                }),
            });

            if (response.ok) {
                console.log("Event updated successfully.");
                alert("Event updated successfully.");
            } else {
                const errorData = await response.json();
                console.error("Error updating event:", errorData);
                alert("Error updating event:", errorData);
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
        navigate('/events');
    };

    return (
        <div>
            <h2>Edit Event</h2>
            <form onSubmit={editEvent}>
                <label>Visiting Team</label>
                <input
                    type="text"
                    autoComplete="off"
                    data-form-type="other"
                    value={visitingTeam}
                    onChange={e => setVisitingTeam(e.target.value)}
                />
                <label>Event Start</label>
                <input
                    type="datetime-local"
                    value={eventStart}
                    onChange={e => setEventStart(e.target.value)}
                />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditEventsPage;