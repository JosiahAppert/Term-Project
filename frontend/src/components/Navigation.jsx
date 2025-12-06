// src/components/Navigation.jsx
import { Link } from 'react-router-dom';
import ResetDBForm from './ResetDBForm';

function Navigation({ backendURL }) {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/events">Events</Link>
            <Link to="/players">Players</Link>
            <Link to="/player-events">Player Events</Link>
            <Link to="/view-tickets">Tickets</Link>
            <Link to="/ticket-holders">Ticket Holders</Link>
            <ResetDBForm backendURL={backendURL} />
        </nav>
    );
}

export default Navigation;