import React from 'react';
import './App.css';
import { Route, HashRouter as Router } from 'react-router-dom';
import Home from './screens/home/home';
import BootPage from './screens/boot-page/boot-page';
import Header from './components/header';
import { Layout } from 'antd';
import QrCode from './screens/qr-code/qr-code';
function App() {
  return (
    <Router>
      <Layout className='layout'>
        <Layout.Header>
          <Header></Header>
        </Layout.Header>
        <Layout.Content>
          <Route path='/' exact>
            <Home></Home>
          </Route>
          <Route path='/boot-page'>
            <BootPage></BootPage>
          </Route>
          <Route path='/qr-code'>
            <QrCode></QrCode>
          </Route>
        </Layout.Content>
      </Layout>
    </Router>
  );
}

export default App;
