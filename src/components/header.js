import { Menu } from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
function Header() {
  const [index,setIndex] = useState(0)
  const history = useHistory()
  const menuList = [
    { key: '/home', name: '首页' },
    { key: '/boot-page', name: '启动页生成' },
    { key: '/qr-code', name: '二维码生成' },
  ]
  const handleClick = (e) => {
    let path = `${e.key}`
    getIndex(path)
    if(e.key==='/home') path = '/'
    history.push(path)
  }
  const getIndex = (path) =>{
    menuList.map((item,index)=>{
      if(path===item.key){
        setIndex(index)
      }else{
        return null
      }
    })
  }
  return (
    <Menu
      onClick={handleClick}
      selectedKeys={menuList[index].key}
      theme={'dark'}
      mode="horizontal">
      {menuList.map((item) => <Menu.Item key={item.key}>{item.name}</Menu.Item>)}
    </Menu>
  );
}

export default Header;
