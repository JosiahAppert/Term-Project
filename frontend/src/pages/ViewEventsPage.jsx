import { useState, useEffect } from "react";
import EventRow from "../components/EventRow.jsx";
import CreateEventForm from "../components/CreateEventForm.jsx";
import UpdateEventForm from "../components/UpdateEventForm.jsx";

function ViewEventsPage({ backendURL }) {
    const [events, setEvents] = useState([]);

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
                        <EventRow key={index} rowObject={event} backendURL={backendURL} refreshEvent={getData}/>
                    ))}

                </tbody>
            </table>

            <CreateEventForm backendURL={backendURL} refreshEvent={getData} />
            <UpdateEventForm events={events} backendURL={backendURL} refreshEvent={getData} />
        </>
    );
}

export default ViewEventsPage;