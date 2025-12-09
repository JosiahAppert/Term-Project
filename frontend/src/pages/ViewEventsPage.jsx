// ###############################################################################
// frontend/src/pages/ViewEventsPage.jsx
// Citations for the following code:
//   Adapted from the following sources:
//   1. Exploration - Web Application Technology
//      Date: November 3, 2025
//      https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-
//         application-technology-2?module_item_id=25645131
// ###############################################################################
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventRow from "../components/EventRow.jsx";

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
            const response = await fetch(`${backendURL}/events`);
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

    const onCreate = async () => {
        navigate("/events/create");
    };

    const onEdit = async eventToEdit => {
        setEventToEdit(eventToEdit);
        navigate("/events/update");
    };

    const onDelete = async eventID => {
        const response = await fetch(`${backendURL}/events/${eventID}`, { method: 'DELETE' });
        if (response.status === 204) {
            getData();
        } else {
            console.error(`Failed to delete event with id = ${eventID}, status code = ${response.status}`)
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
                        <th>Edit/Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {events.map((event, index) => (
                        <EventRow key={index} event={event} onEdit={onEdit} onDelete={onDelete} />
                    ))}
                </tbody>
            </table>
            <button onClick={onCreate}>Create Event</button>
        </>
    );
}

export default ViewEventsPage;