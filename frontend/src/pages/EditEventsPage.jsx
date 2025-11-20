import { useState } from "react";

export const EditEventsPage = ({ backendURL, eventToEdit }) => {
    const [visitingTeam, setVisitingTeam] = useState(eventToEdit.visitingTeam);
    const [eventStart, setEventStart] = useState(eventToEdit.eventStart);

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
            } else {
                const errorData = await response.json();
                console.error("Error updating event:", errorData);
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };

    return (
        <div>
            <h2>Edit Event</h2>
            <form onSubmit={editEvent}>
                <input
                    type="text"
                    value={visitingTeam}
                    data-icloud-keychain="ignore"
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