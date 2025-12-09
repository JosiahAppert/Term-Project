// ###############################################################################
// frontend/src/components/Navigation.jsx
// Citations for the following code:
//   Adapted from the following sources:
//   1. Exploration - Web Application Technology
//        https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-
//           application-technology-2?module_item_id=25645131
// ###############################################################################
import { Link } from 'react-router-dom';
import ResetDBForm from './ResetDBForm';

function Navigation({ backendURL }) {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/events">Events</Link>
            <Link to="/players">Players</Link>
            <Link to="/player-events">Player Events</Link>
            <Link to="/tickets">Tickets</Link>
            <Link to="/ticket-holders">Ticket Holders</Link>
            <ResetDBForm backendURL={backendURL} />
        </nav>
    );
}

export default Navigation;