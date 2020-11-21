import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => (
    <div className="menu-list">
        <h2>Country Management</h2>
        <ul>
            <li>
                <Link to="/country/distance">Distance between countries</Link>
            </li>
            <li>
                <Link to="/country/closest">Closest Country</Link>
            </li>
            <li>
                <Link to="/countries/timezone">Countries in timezones</Link>
            </li>
            <li>
                <Link to="/countries/search">Search countries</Link>
            </li>
        </ul>
    </div>
);

export default Dashboard;
