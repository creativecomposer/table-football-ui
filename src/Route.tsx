import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Dashboard } from 'components/dashboard.component';
import { Games } from 'components/games.component';
import { Players } from 'components/players.component';
import { Teams } from 'components/teams.component';

export function AppRoutes() {
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
      <Route path="/teams">
        <Teams />
      </Route>
      <Route path="/">
        <Redirect to="/dashboard" />
      </Route>
    </Switch>
  );
}
