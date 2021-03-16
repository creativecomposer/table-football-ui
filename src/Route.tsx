import React, { useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { Dashboard } from 'components/dashboard.component';
import { Games } from 'components/games.component';
import { Players } from 'components/players.component';

export function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    document.title = `Table Football Scores Tracker | ${location.pathname.replace('/', '')}`;
  }, [location]);

  return (
    <Switch>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/games">
        <Games />
      </Route>
      <Route path="/players">
        <Players />
      </Route>
      <Route path="/">
        <Redirect to="/dashboard" />
      </Route>
    </Switch>
  );
}
