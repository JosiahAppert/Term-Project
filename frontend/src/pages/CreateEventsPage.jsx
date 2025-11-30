import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateEventsPage = ({ backendURL }) => {
    const [visitingTeam, setVisitingTeam] = useState('');
    const [eventStart, setEventStart] = useState('');

    const navigate = useNavigate();

    const addEvent = async (e) => {
        e.preventDefault();
        const newEvent = {visitingTeam, eventStart};
        console.log(newEvent);
        const response = await fetch(
            `${backendURL}/events/create`, {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(newEvent)
                }
        );

        if(response.ok){
            alert("Successfully added the event");
            navigate('/events');
        } else{
            alert("Failed to add event, status code = " + response.status);
        }
    };

    return (
        <div>
            <h2>Create Event</h2>
            <form onSubmit={addEvent}>
                <label>Visiting Team: </label>
                <input
                    type="text"
                    value={visitingTeam}
                    onChange={e => setVisitingTeam(e.target.value)}
                />
                <label>Event Start: </label>
                <input
                    type="datetime-local"
                    value={eventStart}
                    onChange={e => setEventStart(e.target.value)}
                />
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateEventsPage;