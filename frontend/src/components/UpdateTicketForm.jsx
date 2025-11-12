import { useState } from "react";

const UpdateTicketForm = ({ tickets, events, ticketHolders, backendURL, refreshTicket }) => {
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [formData, setFormData] = useState({
        newEventID: "",
        newTicketHolderID: "",
        price: "",
        seatNumber: ""
    });

    const handleSelectChange = (e) => {
        const ticketID = e.target.value;
        const t = tickets.find((t) => t.ticketID === parseInt(ticketID));
        setSelectedTicket(t);

        setFormData({
            newEventID: t?.eventID || "",
            newTicketHolderID: t?.ticketHolderID || "",
            price: t?.price || "",
            seatNumber: t?.seatNumber || ""
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedTicket) return alert("Please select a ticket to update.");
    };

    return (
        <>
            <h2>Update a Ticket</h2>
            <form className="cuForm" onSubmit={handleSubmit}>
                <label htmlFor="select_ticket">Select Ticket:</label>
                <select id="select_ticket" onChange={handleSelectChange}>
                    <option value="">Select a ticket to update</option>
                    {tickets.map((t) => {
                        const event = events.find((e) => e.eventID === t.eventID);
                        const holder = ticketHolders.find(
                            (h) => h.ticketHolderID === t.ticketHolderID
                        );
                        const label = `#${t.ticketID} - ${holder?.fName || "?"} ${holder?.lName || ""} - ${
                            event?.visitingTeam || "?"
                        } (${t.seatNumber})`;
                        return (
                            <option key={t.ticketID} value={t.ticketID}>
                                {label}
                            </option>
                        );
                    })}
                </select>

                {selectedTicket && (
                    <>
                        <label htmlFor="update_ticket_eventID">New Event:</label>
                        <select
                            id="update_ticket_eventID"
                            name="newEventID"
                            value={formData.newEventID}
                            onChange={handleChange}
                        >
                            {events.map((event) => (
                                <option key={event.eventID} value={event.eventID}>
                                    {event.eventID} - {event.visitingTeam}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="update_ticket_ticketholderID">New Ticket Holder:</label>
                        <select
                            id="update_ticket_ticketholderID"
                            name="newTicketHolderID"
                            value={formData.newTicketHolderID}
                            onChange={handleChange}
                        >
                            {ticketHolders.map((holder) => (
                                <option key={holder.ticketHolderID} value={holder.ticketHolderID}>
                                    {holder.ticketHolderID} - {holder.fName} {holder.lName}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="update_ticket_price">Price:</label>
                        <input
                            type="number"
                            id="update_ticket_price"
                            name="price"
                            step="0.01"
                            value={formData.price}
                            onChange={handleChange}
                        />

                        <label htmlFor="update_ticket_seatNumber">Seat Number:</label>
                        <input
                            type="text"
                            id="update_ticket_seatNumber"
                            name="seatNumber"
                            value={formData.seatNumber}
                            onChange={handleChange}
                        />

                        <input type="submit" value="Update" />
                    </>
                )}
            </form>
        </>
    );
};

export default UpdateTicketForm;
