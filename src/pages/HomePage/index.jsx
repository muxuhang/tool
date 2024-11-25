import React from 'react'
import { useNavigate } from 'react-router-dom'

const toolList = [
  { title: '二维码生成', description: '通过文本生成二维码', path: '/qrcode' },
  { title: '图片裁剪', description: '生成特定尺寸的图片', path: '/qrcode' },
  { title: '图片转换', description: 'png转jpg', path: '/qrcode' },
]
const HomePage = () => {
  const navigate = useNavigate()
  return (
    <div className=''>
      <section className=''>
        <h1>常用工具</h1>
        <p>通过使用工具快速完成需求</p>
      </section>
      <section className=''>
        <h2>常用工具</h2>
        <div className=''>
          {toolList.map((item, key) => <div
            onClick={() => navigate(item.path)}
            className="feature-item" key={key}>
            <h3>{item.title}</h3>
            <span>{item.description}</span>
          </div>)}
        </div>
      </section>
    </div>
  )
}

export default HomePage
