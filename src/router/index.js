import React from 'react'
import { Route, Routes } from 'react-router-dom'
import routes from './routes'
import Header from '@/components/header'

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
