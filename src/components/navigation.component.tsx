import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navigation.component.scss';

export function Navigation() {
  let location = useLocation();

  console.log(location.pathname);

  return (
    <nav className="nav">
      <ul className="nav__list">
        <li>
          <Link
            className={'nav__link' + (location.pathname === '/dashboard' ? ' nav__link--active' : '')}
            to="/dashboard"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link className={'nav__link' + (location.pathname === '/games' ? ' nav__link--active' : '')} to="/games">
            Games
          </Link>
        </li>
        <li>
          <Link className={'nav__link' + (location.pathname === '/players' ? ' nav__link--active' : '')} to="/players">
            Players
          </Link>
        </li>
        <li>
          <Link className={'nav__link' + (location.pathname === '/teams' ? ' nav__link--active' : '')} to="/teams">
            Teams
          </Link>
        </li>
      </ul>
    </nav>
  );
}
