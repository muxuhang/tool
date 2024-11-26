import { Button, Col, Input, Row, Switch, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import TextArea from 'antd/lib/input/TextArea'
import React, { useEffect, useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
function QrCodePage() {
  const [text, setText] = useState('')
  const [useicon, setuseIcon] = useState(true)
  const [size, setSize] = useState(160)
  const [source, setSource] = useState('')
  const [imageSetting, setImageSetting] = useState(null)
  useEffect(() => {
    setImageSetting({
      src: source,
      height: size * 0.18,
      width: size * 0.18,
      excavate: true,
    })
  }, [size, source])
  // canvas 转图片并下载
  const CanvasToImage = () => {
    const canvas = document.getElementById('qrcode')
    const dom = document.createElement('a')
    const image = new Image()
    image.src = canvas.toDataURL('image/png')
    dom.href = image.src
    dom.download = new Date().getTime() + '.png'
    dom.click()
  }
  // function base64ToBlob(base64Data, contentType) {
  //   contentType = contentType || ''
  //   const sliceSize = 1024
  //   const byteCharacters = atob(base64Data.split(',')[1])
  //   const byteArrays = []

  //   for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
  //     const slice = byteCharacters.slice(offset, offset + sliceSize)

  //     const byteNumbers = new Array(slice.length)
  //     for (let i = 0; i < slice.length; i++) {
  //       byteNumbers[i] = slice.charCodeAt(i)
  //     }

  //     const byteArray = new Uint8Array(byteNumbers)
  //     byteArrays.push(byteArray)
  //   }

  //   const blob = new Blob(byteArrays, { type: contentType })
  //   return blob
  // }
  // function downloadBlob(blob, filename) {
  //   const a = document.createElement('a')
  //   const url = URL.createObjectURL(blob)
  //   a.href = url
  //   a.download = filename
  //   a.style.display = 'none'
  //   document.body.appendChild(a)
  //   a.click()
  //   URL.revokeObjectURL(url)
  //   document.body.removeChild(a)
  // }
  // const BlobDownload = () => {
  //   const canvas = document.getElementById('qrcode')
  //   const image = new Image()
  //   image.src = canvas.toDataURL('image/png')
  //   const contentType = image.src.split(':')[1].split(';')[0]
  //   const blob = base64ToBlob(image.src, contentType)
  //   downloadBlob(blob, 'downloaded_image.png')
  // }
  // const showImage = () => {
  //   const canvas = document.getElementById('qrcode')
  //   const image = new Image()
  //   image.src = canvas.toDataURL('image/png')
  //   setImgUrl(image.src)
  // }
  // const clearImage = () => {
  //   setImgUrl('')
  // }
  return (
    <div className='m-3 container mx-auto'>
      <Row gutter={16}>
        <Col flex={1}>
          <TextArea
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='输入文本内容'></TextArea>
        </Col>
        <Col>
          <QRCodeCanvas
            id='qrcode'
            value={text}
            size={size}
            style={{ height: '12rem', width: '12rem' }}
            fgColor='#000000'
            imageSettings={useicon ? imageSetting : null}></QRCodeCanvas>
          <div className='flex items-center my-2'>
            <div className='mr-2'>
              <label className='label mr-2'>使用Logo</label>
              <Switch
                className='option_val'
                checked={useicon}
                onChange={(e) => setuseIcon(e)}></Switch>
            </div>
            {useicon && (
              <>
                <label className='label mr-2'>上传Logo</label>
                <Upload
                  name='logo'
                  customRequest={() => null}
                  showUploadList={false}
                  onChange={(info) => {
                    const reader = new FileReader()
                    reader.addEventListener('load', () =>
                      setSource(reader.result)
                    )
                    reader.readAsDataURL(info.file.originFileObj)
                  }}>
                  <img
                    src={source}
                    alt=''
                    style={{ height: 100, width: 100, display: 'none' }}></img>
                  <Button type='primary'>
                    <UploadOutlined />
                  </Button>
                </Upload>
              </>
            )}
          </div>
          <div className=''>
            <label className='label'>图片大小</label>
            <div className='flex mt-2'>
              <Input
                value={size}
                type='number'
                className='mr-2'
                onChange={(e) => {
                  let newSize = parseFloat(e.target.value)
                  if (newSize < 100) setSize(100)
                  else if (newSize > 3000) setSize(3000)
                  else setSize(newSize)
                }}></Input>
              <Button type='primary' onClick={CanvasToImage}>下载二维码</Button>
            </div>
          </div>
          <div className='py-2 flex gap-2'>
            {/* <Button type='primary' onClick={BlobDownload}>Blob下载</Button> */}
            {/* <Button type='primary' onClick={showImage}>生成图片</Button>
            <Button onClick={clearImage}>清除</Button> */}
          </div>
        </Col>
      </Row>
      {/* <div className='flex items-center justify-center p-2'>
        <img src={imgUrl} alt='' />
      </div> */}
    </div>
  )
}

export default QrCodePage
