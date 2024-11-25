import { Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const menuList = [
  { key: '/index', label: '首页' },
  // { key: '/boot', label: '启动页生成' },
  { key: '/cut-image', label: '图片裁剪' },
  { key: '/qrcode', label: '二维码生成' },
  // { key: '/chinese-chess', label: '中国象棋' },
]
export default function Header() {
  const [index, setIndex] = useState(null)
  const navigate = useNavigate()
  const getIndex = (path) => {
    if (path === '/') path = '/index'
    menuList.forEach((item, i) => {
      if (path === item.key) {
        setIndex(i)
      } else {
        return null
      }
    })
  }
  useEffect(() => {
    if (window.location.pathname) {
      getIndex(window.location.pathname)
    }
  }, [])
  const handleClick = (e) => {
    let path = `${e.key}`
    getIndex(path)
    if (path === '/index') path = '/'
    navigate(path)
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
