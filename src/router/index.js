import React from 'react'
import { Route, Routes } from 'react-router-dom'
import routes from './routes'
import Header from '../components/header'

function RouteWithSubRoutes(props) {
  return <Route {...props} />
}

export default function RouteSwitch() {
  return (
    <>
      <Header />
      <Routes>
        {routes.map((route, i) => (
          <Route
            key={i}
            {...route}
          />
        ))}
      </Routes>
    </>
  )
}
