import { Button, Col, Input, Row, Switch, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react'
import './qr-code.scss';
import logo from './../../images/M.png'
function QrCode() {
  const [text, setText] = useState('')
  const [useicon, setuseIcon] = useState(true)
  const [size, setSize] = useState(160)
  const [source, setSource] = useState(logo)
  const [imageSetting, setImageSetting] = useState(null)
  useEffect(() => {
    setImageSetting({
      src: source,
      height: size * 0.18,
      width: size * 0.18,
      excavate: true
    })
  }, [size, source])
  // canvas 转图片并下载
  const CanvasToImage = () => {
    const canvas = document.getElementById('qrcode')
    const dom = document.createElement("a");
    const image = new Image();
    image.src = canvas.toDataURL("image/png");
    dom.href = image.src
    dom.download = new Date().getTime() + ".png";
    dom.click();
  }

  return (
    <div className="container qr-code">
      <Row className='code_box'>
        <Col className='code_left' flex={16}>
          <TextArea
            rows={6}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className='left_input'
            placeholder='输入文本内容'></TextArea>
        </Col>
        <Col className='code_right'>
          <QRCode
            id='qrcode'
            value={text}
            size={size}
            style={{ height: '10rem', width: '10rem' }}
            fgColor="#000000"
            imageSettings={useicon ? imageSetting : null}></QRCode>
          <div className='right_option'>
            <label className='option_label'>使用Logo</label>
            <Switch
              className='option_val'
              checked={useicon}
              onChange={e => setuseIcon(e)}></Switch>
          </div>
          {useicon ? <div className='right_option'>
            <label className='option_label'>上传Logo</label>
            <Upload
              name="logo"
              customRequest={() => null}
              showUploadList={false}
              onChange={info => {
                const reader = new FileReader();
                reader.addEventListener('load', () => setSource(reader.result));
                reader.readAsDataURL(info.file.originFileObj);
              }}>
              <img src={source} alt='' style={{ height: 100, width: 100, display: 'none' }}></img>
              <Button type='primary'><UploadOutlined /></Button>
            </Upload>
          </div> : null}
          <div className='right_option'>
            <label className='option_label'>图片大小</label>
            <Input
              value={size}
              className='option_val'
              type='number'
              onChange={e => {
                let newSize = parseFloat(e.target.value)
                if(newSize<100) setSize(100)
                else if(newSize>3000) setSize(3000)
                else setSize(newSize)
              }}></Input>
          </div>
          <div className='right_option'>
            <Button
              type='primary'
              onClick={CanvasToImage}>下载二维码</Button>
          </div>
        </Col>
      </Row>
    </div >
  );
}

export default QrCode;
