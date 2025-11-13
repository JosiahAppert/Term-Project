import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const EditEventsPage = ({ eventToEdit }) => {
    const [visitingTeam, setVisitingTeam] = useState(eventToEdit.visitingTeam);
    const [eventStart, setEventStart] = useState(eventToEdit.eventStart);

    const navigate = useNavigate();

    const editEvent = async () => {
        const editedEvent = {visitingTeam, eventStart};
        const response = await fetch(
            `/events/${eventToEdit._id}`, {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(editedEvent)
            }
        );
        if(response.status === 200){
            alert("Successfully edited the event");
        } else{
            alert("Failed to edit the event, status code = " + response.status)
        }
        navigate('/');
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