import React from 'react';
import './App.css';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import Home from './screens/home/home';
import BootPage from './screens/boot-page/boot-page';
import Header from './components/header';
import { Layout } from 'antd';
import QrCode from './screens/qr-code/qr-code';
import NotFound from './screens/not-found/not-found';
function App() {
  return (
    <Router>
      <Layout className='layout'>
        <Layout.Header>
          <Header></Header>
        </Layout.Header>
        <Layout.Content>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/boot-page' component={BootPage} />
            <Route path='/qr-code' component={QrCode} />
            <Route component={NotFound}></Route>
          </Switch>
        </Layout.Content>
        <Layout.Footer></Layout.Footer>
      </Layout>
    </Router>
  );
}

export default App;
