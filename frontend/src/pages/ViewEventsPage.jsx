import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventRow from "../components/EventRow.jsx";
import CreateEventForm from "../components/CreateEventForm.jsx";

function ViewEventsPage({ backendURL, setEventToEdit }) {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    const columnAliases = {
        eventID: "Event ID",
        visitingTeam: "Visiting Team",
        eventStart: "Event Start"
    };

    const getData = async () => {
        try {
            const response = await fetch(`${backendURL}/view-events`);
            if (!response.ok) throw new Error(`Server error: ${response.status}`);
            const data = await response.json();
            setEvents(data.events);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const onEdit = async eventToEdit => {
        setEventToEdit(eventToEdit);
        navigate("/events/update");
    };

    const onDelete = async eventID => {
        const response = await fetch(`/events/${eventID}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/events');
            const events = await getResponse.json();
            setEvents(events);
        } else {
            console.error(`Failed to delete exercise with id = ${_id}, status code = ${response.status}`)
        }
    }

    return (
        <>
            <h2>List of Events</h2>

            <table>
                <thead>
                    <tr>
                        {events.length > 0 && Object.keys(events[0]).map((header, index) => (
                            <th key={index}>
                                {columnAliases[header] || header}
                            </th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {events.map((event, index) => (
                        <EventRow key={index} event={event} onEdit={onEdit} onDelete={onDelete} />
                    ))}

                </tbody>
            </table>

            <CreateEventForm backendURL={backendURL} refreshEvent={getData} />
        </>
    );
}

export default ViewEventsPage;