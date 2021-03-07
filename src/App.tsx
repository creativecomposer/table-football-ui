import React from 'react';
import { HashRouter } from 'react-router-dom';
import { AppRoutes } from './Route';
import { Navigation } from 'components/navigation.component';
import './App.scss';

function App() {
  return (
    <>
      <header className="App-header">
        <p>The Table Football Score Tracker</p>
      </header>
      <HashRouter>
        <Navigation />
        <main role="main">
          <AppRoutes />
        </main>
      </HashRouter>
      <footer></footer>
    </>
  );
}

export default App;
