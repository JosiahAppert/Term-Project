import '../App.css';


const EventRow = ({ rowObject, backendURL, refreshEvent }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            
        </tr>
    );
};

export default EventRow;