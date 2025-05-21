import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()
  return (
    <div className=" bg-gray-100 flex flex-col items-center" style={{
      height: 'calc(100vh - 46px)'
    }}>
      <header className="w-full text-center py-4 shadow-lg">
        <div className="text-3xl font-bold">网站功能简介</div>
      </header>
      <main className="flex-1 w-full max-w-4xl mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 图片裁剪功能 */}
          <FeatureCard
            title="图片裁剪"
            onClick={() => { navigate('/cut-image') }}
            description="上传图片并裁剪为需要的尺寸，支持自由调整裁大小。"
            imageUrl="https://picsum.photos/808/212?1"
          />
          {/* 二维码生成 */}
          <FeatureCard
            title="二维码生成"
            onClick={() => { navigate('/qrcode-create') }}
            description="输入文本生成对应的二维码，用于分享和展示。"
            imageUrl="https://picsum.photos/808/212?2"
          />
          {/* 二维码识别 */}
          <FeatureCard
            title="二维码识别"
            onClick={() => { navigate('/qrcode-parse') }}
            description="上传二维码图片，快速解析出包含的信息。"
            imageUrl="https://picsum.photos/808/212?3"
          />
          {/* Picsum 网络图片 */}
          <FeatureCard
            title="获取Picsum图片"
            onClick={() => { navigate('/picsum') }}
            description="从 Picsum 网站获取随机图片，并支持设置宽高。"
            imageUrl="https://picsum.photos/808/212?4"
          />
        </div>
      </main>
      <footer className="w-full bg-gray-800 text-white text-center py-4 mt-6">
        <span>© 2024 网站功能演示. 版权所有.</span>
      </footer>
    </div>
  )
}

const FeatureCard = ({ title, description, imageUrl, onClick }) => (
  <div className="bg-white rounded-lg p-4 cursor-pointer transition hover:shadow-" onClick={onClick}>
    <img
      src={imageUrl}
      alt={title}
      className="w-full h-40 object-cover rounded-md mb-4"
    />
    <h2 className="text-xl font-bold text-gray-800">{title}</h2>
    <p className="text-gray-600 mt-2">{description}</p>
  </div>
)

export default HomePage
