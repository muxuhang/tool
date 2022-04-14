import React from 'react';
import './App.css';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import Home from './screens/home/home';
import BootPage from './screens/boot-page/boot-page';
import Header from './components/header';
import { Layout } from 'antd';
import QrCode from './screens/qr-code/qr-code';
import QrCode2 from './screens/qr-code2/qr-code';
import NotFound from './screens/not-found/not-found';
import ChineseChess from './screens/chinese-chess/chinese-chess';
import LogoPage from './screens/logo-page/logo-page';
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
            <Route path='/logo-page' component={LogoPage} />
            <Route path='/qr-code' component={QrCode} />
            <Route path='/qr-code2' component={QrCode2} />
            <Route path='/chinese-chess' component={ChineseChess} />
            <Route component={NotFound}></Route>
          </Switch>
        </Layout.Content>
        <Layout.Footer></Layout.Footer>
      </Layout>
    </Router>
  );
}

export default App;
