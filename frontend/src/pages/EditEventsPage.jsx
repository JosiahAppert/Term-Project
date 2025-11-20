import { useState } from "react";

export const EditEventsPage = ({ backendURL, eventToEdit }) => {
    const [visitingTeam, setVisitingTeam] = useState(eventToEdit.visitingTeam);
    const [eventStart, setEventStart] = useState(eventToEdit.eventStart);

    const editEvent = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(backendURL + '/events/update', {
                method: 'POST',
            });

            if (response.ok) {
                console.log("Event updated successfully.");
            } else {
                console.error("Error updating event.");
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };

    return (
        <div>
            <h2>Edit Event</h2>
            <div>
                <input
                    type="text"
                    value={visitingTeam}
                    onChange={e => setVisitingTeam(e.target.value)} />
                <input
                    type="datetime-local"
                    value={eventStart}
                    onChange={e => setEventStart(e.target.value)} />
            </div>
            <div>
                <button
                    onClick={editEvent}
                >Update</button>
            </div>
        </div>
    );
}

export default EditEventsPage;