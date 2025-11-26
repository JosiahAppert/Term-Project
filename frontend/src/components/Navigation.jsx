// src/components/Navigation.jsx
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/events">Events</Link>
            <Link to="/players">Players</Link>
            <Link to="/view-player-events">Player Events</Link>
            <Link to="/view-tickets">Tickets</Link>
            <Link to="/view-ticket-holders">Ticket Holders</Link>
        </nav>
    );
}

export default Navigation;