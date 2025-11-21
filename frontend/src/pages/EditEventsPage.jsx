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
                <input
                    type="text"
                    autoComplete="off"
                    data-form-type="other"
                    value={visitingTeam}
                    onChange={e => setVisitingTeam(e.target.value)}
                />
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