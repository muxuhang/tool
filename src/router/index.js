import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import routes from './routes'
import Header from '@/components/header'
import FontFaceObserver from 'fontfaceobserver'

export default function RouteSwitch() {
  const [fontLoaded, setFontLoaded] = useState(false)
  useEffect(() => {
    const font = new FontFaceObserver('AlimamaDaoLiTi')
    font
      .load()
      .then(() => {
        setFontLoaded(true) // 字体加载完成
      })
      .catch((err) => {
        console.error('Font failed to load.', err)
        setFontLoaded(true) // 加载失败也显示页面
      })
  }, [])
  return (
    <div className={`${!fontLoaded ? 'hidden' : 'visilbe'}`}>
      <Header />
      <Routes>
        {routes.map((route, i) => (
          <Route
            key={i}
            {...route}
          />
        ))}
      </Routes>
    </div>
  )
}
