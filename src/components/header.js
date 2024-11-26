import { Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const menuList = [
  { key: '/', label: '首页' },
  // { key: '/boot', label: '启动页生成' },
  { key: '/cut-image', label: '图片裁剪' },
  { key: '/qrcode-create', label: '二维码生成' },
  { key: '/qrcode-parse', label: '二维码解析' },
  // { key: '/chinese-chess', label: '中国象棋' },
]
export default function Header() {
  const [index, setIndex] = useState(null)
  const navigate = useNavigate()
  const getIndex = (hash = '') => {
    const path = hash?.replace('#', '') || '/'
    menuList.forEach((item, i) => {
      if (path === item.key) {
        setIndex(i)
      }
    })
  }
  useEffect(() => {
    getIndex(window.location.hash)
  }, [])
  const handleClick = ({ key }) => {
    getIndex(key)
    navigate(key)
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
