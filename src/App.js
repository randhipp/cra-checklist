import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';

import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Home from './Pages/Home';
import ChecklistIndex from './Pages/Checklists/index';
import ChecklistCreate from './Pages/Checklists/CreateForm/form';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="header">
            <NavLink exact activeClassName="active" to="/">Home</NavLink>
            <NavLink activeClassName="active" to="/login">Login</NavLink>
            <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink>
            <NavLink activeClassName="active" exact={true} to="/checklists">Checklists</NavLink>
            <NavLink activeClassName="active" exact={true} to="/checklists/create">Create Checklists</NavLink>
          </div>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Home} />
              <PublicRoute path="/login" component={Login} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/checklists" exact={true} component={ChecklistIndex} />
              <PrivateRoute path="/checklists/create" exact={true} component={ChecklistCreate} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;