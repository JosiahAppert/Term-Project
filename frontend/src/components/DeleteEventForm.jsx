const DeleteEventForm = ({ rowObject, backendURL, refreshEvent }) => {
    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${backendURL}/delete-event/${rowObject.id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Failed to delete");
            refreshEvent();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <td>
            <form onSubmit={handleDelete}>
                <button type="submit">Delete</button>
            </form>
        </td>
    );
};

export default DeleteEventForm;