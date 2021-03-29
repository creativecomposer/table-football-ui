import React, { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppRoutes } from './Route';
import { Navigation } from 'components/navigation.component';
import { ErrorBoundary } from 'components/error-boundary.component';
import './App.scss';
import { fetchPlayers } from 'state-management/actions';

function App() {
  const reduxDispatch = useDispatch();
  useEffect(() => fetchPlayers(reduxDispatch), []);

  return (
    <ErrorBoundary>
      <header className="App-header">
        <p>The Table Football Score Tracker</p>
      </header>
      <HashRouter>
        <Navigation />
        <main role="main" className="main">
          <AppRoutes />
        </main>
      </HashRouter>
      <footer></footer>
    </ErrorBoundary>
  );
}

export default App;
