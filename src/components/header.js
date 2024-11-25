import { Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Header() {
  const [index, setIndex] = useState(null)
  const navigate = useNavigate()
  const menuList = [
    { key: '/index', label: '首页' },
    // { key: '/boot', label: '启动页生成' },
    { key: '/cut-image', label: '图片裁剪' },
    { key: '/qrcode', label: '二维码生成' },
    // { key: '/chinese-chess', label: '中国象棋' },
  ]
  useEffect(() => {
    // if (history.location.pathname) {
    //   getIndex(history.location.pathname)
    // }
  }, [])
  const handleClick = (e) => {
    let path = `${e.key}`
    getIndex(path)
    if (path === '/index') path = '/'
    navigate(path)
  }
  const getIndex = (path) => {
    if (path === '/') path = '/index'
    menuList.map((item, i) => {
      if (path === item.key) {
        setIndex(i)
      } else {
        return null
      }
    })
  }
  
  return (
    <Menu
      onClick={handleClick}
      selectedKeys={typeof index === 'number' ? menuList[index].key : null}
      theme={'dark'}
      mode='horizontal'
      items={menuList}
    />
  )
}
