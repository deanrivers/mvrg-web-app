import React from 'react';
import './App.css';
import FadeIn from 'react-fade-in'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Calendar from './components/calendar'
import Home from './components/home'
import Social from './components/social'
import Nav from './components/nav'
import Games from './components/games'
import Form from './components/form'

let App = () => {
  return (
    <div className="App">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <Router>
          <Nav/>
          <Route
            render={() => (   
              <Switch>
                <Route path="/home" component={Home} exact />
                <Route path="/social" component={Social} />
                <Route path="/calendar" component={Calendar} />
                <Route path="/games" component={Games} />
                <Route path="/forms" component={Form} />
              </Switch>
            )}
          />
        </Router>
    </div>
  );
}

export default App;
