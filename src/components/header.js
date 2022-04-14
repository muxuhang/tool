import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
function Header() {
  const [index, setIndex] = useState(null)
  const history = useHistory()
  const menuList = [
    { key: '/index', name: '首页' },
    { key: '/boot-page', name: '启动页生成' },
    { key: '/logo-page', name: '启动图标生成' },
    { key: '/qr-code', name: '二维码生成' },
    { key: '/chinese-chess', name: '中国象棋' },
  ]
  useEffect(() => {
    if (history.location.pathname) {
      getIndex(history.location.pathname)
    }
  }, [])
  const handleClick = (e) => {
    let path = `${e.key}`
    getIndex(path)
    if (path === '/index') path = '/'
    history.push(path)
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
      mode="horizontal">
      {menuList.map((item) => <Menu.Item key={item.key}>{item.name}</Menu.Item>)}
    </Menu>
  );
}

export default Header;
