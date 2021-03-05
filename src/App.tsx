import React from 'react';
import { HashRouter, Link } from 'react-router-dom';
import { AppRoutes } from './Route';
import './App.scss';

function App() {
  return (
    <>
      <header className="App-header">
        <p>The Table Football Score Tracker</p>
      </header>
      <HashRouter>
        <nav>
          <ul className="nav-list">
            <li className="nav-link">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-link">
              <Link to="/games">Games</Link>
            </li>
            <li className="nav-link">
              <Link to="/players">Players</Link>
            </li>
            <li className="nav-link">
              <Link to="/teams">Teams</Link>
            </li>
          </ul>
        </nav>
        <main role="main">
          <AppRoutes />
        </main>
      </HashRouter>
      <footer></footer>
    </>
  );
}

export default App;
