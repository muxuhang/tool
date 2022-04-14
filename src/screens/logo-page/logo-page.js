/*
  简单启动页制作
  作者 muxuhang
  创建于 2020年9月15日
*/
import { Button, Col, Input, Popover, Row, Select, Slider, Upload } from 'antd';
import Grid from 'antd/lib/card/Grid';
import React, { useEffect, useRef, useState } from 'react';
import { SketchPicker } from 'react-color';
import { PlusOutlined } from '@ant-design/icons';
import './logo-page.scss';
function LogoPage() {
  // 初始icon
  const [source, setSource] = useState(require('../../images/icon.png'))
  // 生成图片宽度/px
  const [size, setSize] = useState(1024)
  // icon在图片中的占比
  const [scale, setScale] = useState(1)
  const [radius, setRadius] = useState(0)
  // 生成背景色
  const [fillStyle, setFillStyle] = useState('#ffffff')
  const canvasRef = useRef()
  useEffect(() => {
    painting()
  }, [size, fillStyle, source, scale, radius])
  // 初始化canvas
  const painting = async () => {
    const canvas = canvasRef.current
    if (canvas.getContext) {
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = fillStyle
      ctx.fillRect(0, 0, size, size)
      var image = document.getElementById('source');
      const drawImageSize = size <= size ? (size * scale) : size * scale * (image.width / image.height)
      await drawRoundedRect(ctx, 0, 0, canvas.width, canvas.height, canvas.width * radius / 100);
      ctx.clip()
      ctx.drawImage(
        image,
        canvas.width / 2 - drawImageSize / 2,
        canvas.height / 2 - drawImageSize / 2,
        drawImageSize,
        drawImageSize);
    }
  }
  const drawRoundedRect = (ctx, x, y, width, height, r) => {
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + width - r, y)
    ctx.arc(x + width - r, y + r, r, 1.5 * Math.PI, 2 * Math.PI)
    ctx.lineTo(x + width, y + height - r)
    ctx.arc(x + width - r, y + height - r, r, 0, 0.5 * Math.PI)
    ctx.lineTo(x + r, y + height)
    ctx.arc(x + r, y + height - r, r, 0.5 * Math.PI, 1 * Math.PI)
    ctx.lineTo(x, y + r)
    ctx.arc(x + r, y + r, r, 1 * Math.PI, 1.5 * Math.PI)
  }
  // 修改图标
  const handleChange = info => {
    const reader = new FileReader();
    reader.addEventListener('load', () => setSource(reader.result));
    reader.readAsDataURL(info.file.originFileObj);
  };
  // canvas 转图片并下载
  const CanvasToImage = () => {
    const canvas = canvasRef.current
    const dom = document.createElement("a");
    const image = new Image();
    image.src = canvas.toDataURL("image/png");
    dom.href = image.src
    dom.download = new Date().getTime() + ".png";
    dom.click();
  }
  return (
    <div className="container boot-page">
      <div className='start_flex'>
        <div className='flex_left'>
          <canvas
            className='canvas'
            style={{ height: 375 * size / size + 'px' }}
            ref={canvasRef}
            width={size}
            height={size}>
            您的浏览器不支持canvas，请更换浏览器.
          </canvas>
        </div>
        <Grid hoverable={false} className='flex_right'>
          <Col className='right_item'>
            <label className='item_title'>上传图片</label>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              onChange={handleChange}
              customRequest={() => null}
            >
              {source ? <img id='source' src={source} alt='' style={{ width: '100%' }} /> : (
                <PlusOutlined />
              )}
            </Upload>
          </Col>
          <Col className='right_item'>
            <label className='item_title'>圆角</label>
            <Slider
              min={0}
              max={50}
              defaultValue={radius}
              onChange={(e) => {
                setRadius(e)
              }}></Slider>
          </Col>
          <Col className='right_item'>
            <label className='item_title'>图片大小(宽度占比/高度占比)</label>
            <Slider
              min={10}
              max={100}
              defaultValue={scale * 100}
              onChange={(e) => {
                setScale(e / 100)
              }}></Slider>
          </Col>
          <Row gutter={20}>
            <Col className='right_item'>
              <label className='item_title'>自定义大小</label>
              <Input
                placeholder='size'
                type='number'
                onChange={(e) => {
                  if (e.target.value === 0) return
                  setSize(parseFloat(e.target.value))
                }}
                defaultValue={size}></Input>
            </Col>
          </Row>
          <Col className='right_item'>
            <label className='item_title'>背景颜色</label>
            <Row className='color_lump'>
              <Input
                value={fillStyle}
                className='lump'
                onChange={e => setFillStyle(e.target.value)}
              ></Input>
              <Popover
                trigger="click"
                content={<SketchPicker
                  className='color_picker'
                  color={fillStyle}
                  onChangeComplete={(e) => setFillStyle(e.hex)} />}>
                <Button style={{ backgroundColor: fillStyle }}> </Button>
              </Popover>
            </Row>
          </Col>
          <Button
            type='primary'
            onClick={() => CanvasToImage()}>转换图片</Button>
        </Grid>
      </div>

    </div>
  );
}

export default LogoPage;
