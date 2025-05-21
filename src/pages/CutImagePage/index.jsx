
/**
 * 
 * @author muxuhang
 * @date 2024-11-26
 * @description 图片裁剪 
 */
// 上传图片
// 裁剪图片
// 设置图片宽高
// 设置图片圆角

import { Button, Input, Slider, Upload } from "antd"
import { useEffect, useRef, useState } from "react"
import { PlusOutlined } from '@ant-design/icons'

// 设置图片占比
export default function CutImagePage() {
  const canvasRef = useRef()
  const [imageConfig, setImageConfig] = useState({
    source: '',
    height: 500,
    width: 500,
    scale: 100,
    radius: 0
  })
  const onChange = (e) => {
    const val = e.target.value
    const type = e.currentTarget.name
    setImageConfig(config => ({ ...config, [type]: val }))
  }
  const handleChange = (info) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => setImageConfig(config => ({ ...config, source: reader.result })))
    reader.readAsDataURL(info.file.originFileObj)
    drawCanvas(imageConfig)
  }
  const drawCanvas = (config) => {
    const canvas = canvasRef.current
    const scale = config.scale / 100
    let image = new Image()
    image.src = config.source
    image.onload = () => {
      if (canvas.getContext && !!config && !!image) {
        if (image.width && image.height) {
          canvas.width = config.width
          canvas.height = config.height
          let ctx = canvas.getContext('2d')
          // ctx.fillStyle = '#ffffff'
          // 计算图片宽高和canvas宽高比，保证scale为100时占满全屏
          const drawImageWidth = (config.width / config.height <= image.width / image.height) ?
            config.height * image.width / image.height :
            config.width
          const drawImageHeight = (config.width / config.height <= image.width / image.height) ?
            config.height :
            config.width * image.height / image.width
          ctx.clearRect(0, 0, drawImageWidth * scale, drawImageHeight * scale)
          ctx.fillStyle = "rgba(255, 0, 0, 0)"
          // ctx.fillStyle = "#ffffff"
          // 绘制圆角矩形路径
          ctx.beginPath()
          const x = 0, y = 0
          const width = config.width,
            height = config.height,
            radius = config.radius
          ctx.moveTo(x + radius, 0)
          ctx.lineTo(x + width - radius, y)
          ctx.arcTo(x + width, y, x + width, y + radius, radius)
          ctx.lineTo(x + width, y + height - radius)
          ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius)
          ctx.lineTo(x + radius, y + height)
          ctx.arcTo(x, y + height, x, y + height - radius, radius)
          ctx.lineTo(x, y + radius)
          ctx.arcTo(x, y, x + radius, y, radius)
          ctx.closePath()
          ctx.clip()
          ctx.fillRect(0, 0, config.width, config.height)
          ctx.drawImage(
            image,
            (canvas.width - drawImageWidth * scale) / 2,
            (canvas.height - drawImageHeight * scale) / 2,
            drawImageWidth * scale,
            drawImageHeight * scale
          )
        }
      }
    }
  }
  useEffect(() => {
    if (imageConfig.width && imageConfig.height) {
      drawCanvas(imageConfig)
    }
  }, [imageConfig])
  // canvas 转图片并下载
  const canvasToImage = () => {
    const canvas = canvasRef.current
    const dom = document.createElement('a')
    const image = new Image()
    image.src = canvas.toDataURL('image/png')
    dom.href = image.src
    dom.download = '下载' + new Date().getTime() + '.png'
    dom.click()
  }
  return <div className="container mx-auto">
    <div className="flex p-2">
      <div className='bg-gray-100 flex items-center justify-center overflow-hidden' style={{
        width: 600,
        height: 600
      }}>
        <canvas
          className='canvas border w-11/12 h-11/12'
          height={imageConfig.height}
          width={imageConfig.width}
          style={{
            transform: `scalc(${imageConfig.scale})`
          }}
          ref={canvasRef}>
          您的浏览器不支持canvas，请更换浏览器.
        </canvas>
      </div>
      <div className="flex flex-col gap-2 ml-2">
        <label className='item_title'>上传图片</label>
        <Upload
          name='avatar'
          listType='picture-card'
          className='avatar-uploader'
          showUploadList={false}
          onChange={handleChange}
          customRequest={() => null}>
          {imageConfig.source ? (
            <img id='source' src={imageConfig.source} alt='' />
          ) : (
            <PlusOutlined />
          )}
        </Upload>
        <div className="label">宽度(px)</div>
        <Input name="width" type="number" value={imageConfig.width} onChange={onChange} />
        <div className="label">高度(px)</div>
        <Input name="height" type="number" value={imageConfig.height} onChange={onChange} />
        <div className="label">比例(默认1)</div>
        <Slider
          min={10}
          max={100}
          defaultValue={imageConfig.scale}
          onChange={(scale) => { setImageConfig(config => ({ ...config, scale: scale })) }}></Slider>
        <div className="label">圆角(px)</div>
        <Slider
          min={0}
          max={(imageConfig.height > imageConfig.width ? imageConfig.height : imageConfig.width) / 2}
          defaultValue={imageConfig.radius}
          onChange={(radius) => { setImageConfig(config => ({ ...config, radius })) }}></Slider>
        <Button
          type='primary'
          onClick={() => canvasToImage()}>
          下载
        </Button>
      </div>
    </div>
  </div>
}