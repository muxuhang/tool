import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import './home.scss'
function Home() {
  return (
    <div className="container home">
      <Button className='home_btn' type='primary'><Link to='/boot-page'>启动页生成</Link></Button>
      <Button className='home_btn' type='primary'><Link to='/qr-code'>二维码生成</Link></Button>
      <Button className='home_btn' type='primary'><Link to='/videoReduce'>视频压缩</Link></Button>
      <Button className='home_btn' type='primary'><Link to='/imageReduce'>图片压缩</Link></Button>
    </div>
  );
}

export default Home;
