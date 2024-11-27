import { Col, Row, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import jsQR from "jsqr"
/**
 * @author muxuhang
 * @description 二维码生成 
 */
export default function QrCodeParsePage() {
  const [text, setText] = useState('')
  const [errorText, setErrorText] = useState('点击左侧选择要识别的二维码')
  const [source, setSource] = useState('')

  const handleChange = (info) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => setSource(reader.result))
    reader.readAsDataURL(info.file.originFileObj)
  }
  const getQrcodeText = (imgUrl) => {
    const img = new Image()
    setText('')
    img.src = imgUrl
    setErrorText('点击左侧选择要识别的二维码')
    img.onload = () => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const code = jsQR(imageData.data, imageData.width, imageData.height)

      if (code) {
        console.log("二维码内容:", code.data) // 打印二维码的内容
        setText(code.data)
      } else {
        console.log("未检测到二维码")
        setErrorText('未检测到二维码')
      }
    }
  }
  useEffect(() => {
    getQrcodeText(source)
  }, [source])
  return (
    <div className='m-3 container mx-auto'>
      <Row gutter={16}>
        <Col>
          <Upload
            name='avatar'
            listType='picture-card'
            className='avatar-uploader'
            showUploadList={false}
            onChange={handleChange}
            customRequest={() => null}>
            {source ? (
              <img id='source' src={source} alt='' />
            ) : (
              <PlusOutlined />
            )}
          </Upload>
        </Col>
        <Col flex={1}>
          <div className='text-gray-500 bg-gray-50 h-28 p-2'>{text || errorText}</div>
        </Col>
      </Row>
    </div >
  )
}