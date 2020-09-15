import React from 'react';
import './App.css';
import { Route,BrowserRouter as Router } from 'react-router-dom';
import Home from './screens/home/home';
import StartPage from './screens/startPage/startPage';
function App() {
  return (
    <Router>
      <Route path='/' exact>
        <Home></Home>
      </Route>
      <Route path='/startPage'>
        <StartPage></StartPage>
      </Route>
    </Router>
  );
}

export default App;
