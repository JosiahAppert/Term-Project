// ###############################################################################
// frontend/src/App.jsx
// Citations for the following code:
//   Adapted from the following sources:
//   1. Exploration - Web Application Technology
//        https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-
//           application-technology-2?module_item_id=25645131
// ###############################################################################

import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation.jsx';
import HomePage from './pages/HomePage.jsx';

import ViewEventsPage from './pages/ViewEventsPage.jsx';
import CreateEventsPage from './pages/CreateEventsPage.jsx';
import EditEventsPage from './pages/EditEventsPage.jsx';

import ViewPlayerEventsPage from './pages/ViewPlayerEventsPage.jsx';
import CreatePlayerEventsPage from './pages/CreatePlayerEventsPage.jsx';
import EditPlayerEventsPage from './pages/EditPlayerEventsPage.jsx';

import ViewPlayersPage from './pages/ViewPlayersPage.jsx';
import CreatePlayersPage from './pages/CreatePlayersPage.jsx';
import EditPlayersPage from './pages/EditPlayersPage.jsx';

import ViewTicketHoldersPage from './pages/ViewTicketHoldersPage.jsx';
import CreateTicketHoldersPage from './pages/CreateTicketHoldersPage.jsx';
import EditTicketHoldersPage from './pages/EditTicketHoldersPage.jsx';

import ViewTicketsPage from './pages/ViewTicketsPage.jsx';
import CreateTicketsPage from './pages/CreateTicketsPage.jsx';
import EditTicketsPage from './pages/EditTicketsPage.jsx';

import ResetDBForm from './components/ResetDBForm.jsx';

// Define the backend port and URL for API requests
const backendPort = 1986; // Ideally stored in an environment variable
const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}`;

function App() {
  const [message, setMessage] = useState(null);
  const [eventToEdit, setEventToEdit] = useState([]);
  const [playerToEdit, setPlayerToEdit] = useState([]);
  const [ticketHolderToEdit, setTicketHolderToEdit] = useState([]);
  const [playerEventToEdit, setPlayerEventToEdit] = useState([]);
  const [ticketToEdit, setTicketToEdit] = useState([]);

  // Get the data from the database
  const getData = async () => {
    try {
      const response = await fetch(backendURL);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessage(JSON.stringify(data, null, 2)); // formatted string for debugging
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Load table on page load
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Team Revenue Tracker</h1>
        <p>
          Use this app to keep track of ticket sales and player salaries for a sports team.
        </p>
      </header>

      <div className="main-content">
        <Navigation backendURL={backendURL} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/reset-db" element={<ResetDBForm backendURL={backendURL} />} />
            <Route path="/events" element={<ViewEventsPage backendURL={backendURL} setEventToEdit={setEventToEdit} />} />
            <Route path="/events/create" element={<CreateEventsPage backendURL={backendURL} />} />
            <Route path="/events/update" element={<EditEventsPage backendURL={backendURL} eventToEdit={eventToEdit} />} />
            <Route path="/players" element={<ViewPlayersPage backendURL={backendURL} setPlayerToEdit={setPlayerToEdit} />} />
            <Route path="/players/create" element={<CreatePlayersPage backendURL={backendURL} />} />
            <Route path="/players/update" element={<EditPlayersPage backendURL={backendURL} playerToEdit={playerToEdit} />} />
            <Route path="/player-events" element={<ViewPlayerEventsPage backendURL={backendURL} setPlayerEventToEdit={setPlayerEventToEdit} setEventToEdit={setEventToEdit} setPlayerToEdit={setPlayerToEdit} />} />
            <Route path="/player-events/create" element={<CreatePlayerEventsPage backendURL={backendURL} events={eventToEdit} players={playerToEdit}/>} />
            <Route path="/player-events/update" element={<EditPlayerEventsPage backendURL={backendURL} events={eventToEdit} players={playerToEdit} playerEventToEdit={playerEventToEdit} />} />
            <Route path="/tickets" element={<ViewTicketsPage backendURL={backendURL} setTicketToEdit={setTicketToEdit} setTicketHolderToEdit={setTicketHolderToEdit} setEventToEdit={setEventToEdit} />} />
            <Route path="/tickets/create" element={<CreateTicketsPage backendURL={backendURL} events={eventToEdit} ticketHolders={ticketHolderToEdit} />} />
            <Route path="/tickets/update" element={<EditTicketsPage backendURL={backendURL} events={eventToEdit} ticketHolders={ticketHolderToEdit} ticketToEdit={ticketToEdit} />} />
            <Route path="/ticket-holders" element={<ViewTicketHoldersPage backendURL={backendURL} setTicketHolderToEdit={setTicketHolderToEdit} />} />
            <Route path="/ticket-holders/create" element={<CreateTicketHoldersPage backendURL={backendURL} />} />
            <Route path="/ticket-holders/update" element={<EditTicketHoldersPage backendURL={backendURL} ticketHolderToEdit={ticketHolderToEdit} />} />
          </Routes>
        </main>
      </div>

      <footer>&copy; 2025 Josiah Appert &amp; Caden Smith</footer>
    </div>
  );
}

export default App;
