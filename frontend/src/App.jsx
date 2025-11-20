import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation.jsx';
import HomePage from './pages/HomePage.jsx';
import ViewEventsPage from './pages/ViewEventsPage.jsx';
import EditEventsPage from './pages/EditEventsPage.jsx';
import ViewPlayerEventsPage from './pages/ViewPlayerEventsPage.jsx';
import ViewPlayersPage from './pages/ViewPlayersPage.jsx';
import ViewTicketHoldersPage from './pages/ViewTicketHoldersPage.jsx';
import ViewTicketsPage from './pages/ViewTicketsPage.jsx';
import ResetDBForm from './components/ResetDBForm.jsx';

// Define the backend port and URL for API requests
const backendPort = 1986; // Ideally stored in an environment variable
const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}`;

function App() {
  const [message, setMessage] = useState(null);
  const [eventToEdit, setEventToEdit] = useState([]);

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
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage backendURL={backendURL} />} />
            <Route path="/reset-db" element={<ResetDBForm backendURL={backendURL} />} />
            <Route path="/view-events" element={<ViewEventsPage backendURL={backendURL} setEventToEdit={setEventToEdit} />} />
            <Route path="/edit-event" element={<EditEventsPage backendURL={backendURL} eventToEdit={eventToEdit} />} />
            <Route path="/view-players" element={<ViewPlayersPage backendURL={backendURL} />} />
            <Route path="/view-player-events" element={<ViewPlayerEventsPage backendURL={backendURL} />} />
            <Route path="/view-tickets" element={<ViewTicketsPage backendURL={backendURL} />} />
            <Route path="/view-ticket-holders" element={<ViewTicketHoldersPage backendURL={backendURL} />} />
          </Routes>
        </main>
      </div>

      <footer>&copy; 2025 Josiah Appert &amp; Caden Smith</footer>
    </div>
  );
}

export default App;
