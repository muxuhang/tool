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
import './boot-page.scss';
function BootPage() {
  // 初始icon
  const [source, setSource] = useState(require('../../images/icon.png'))
  // 生成图片宽度/px
  const [sizew, setSizew] = useState(1242)
  // 生成图片高度/px
  const [sizeh, setSizeh] = useState(2688)
  // icon竖直位置/百分比
  const [marginVertical, setMarginVertical] = useState(0.5)
  // icon水平位置/百分比
  const [marginHorizontal, setMarginHorizontal] = useState(0.5)
  // icon在图片中的占比
  const [scale, setScale] = useState(0.5)
  // 生成背景色
  const [fillStyle, setFillStyle] = useState('#ffffff')
  const canvasRef = useRef()
  useEffect(() => {
    painting()
  }, [sizew, sizeh, fillStyle, source, scale, marginVertical, marginHorizontal])
  // 初始化canvas
  const painting = () => {
    const canvas = canvasRef.current
    if (canvas.getContext) {
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = fillStyle
      ctx.fillRect(0, 0, sizew, sizeh)
      var image = document.getElementById('source');
      const drawImageWidht = sizew <= sizeh ? (sizew * scale) : sizeh * scale * (image.width / image.height)
      const drawImageHeight = sizew <= sizeh ? sizew * scale * (image.height / image.width) : (sizeh * scale)
      console.log(drawImageWidht, drawImageHeight);
      ctx.drawImage(
        image,
        sizew * marginVertical - drawImageWidht / 2,
        sizeh * marginHorizontal - drawImageHeight / 2,
        drawImageWidht,
        drawImageHeight)
    }
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
  // ios 启动页大小
  const sizeList = [
    { name: 'iPhone Xs Max(竖屏)', width: 1242, height: 2688 },
    { name: 'iPhone Xs Max(横屏)', width: 2688, height: 1242 },
    { name: 'iPhone XR(竖屏)', width: 828, height: 1792 },
    { name: 'iPhone XR(横屏)', width: 1792, height: 828 },
    { name: 'iPhone X/iPhone Xs(竖屏)', width: 1125, height: 2436 },
    { name: 'iPhone X/iPhone Xs(横屏)', width: 2436, height: 1125 },
    { name: 'Retina HD 5.5“(竖屏)', width: 1242, height: 2208 },
    { name: 'Retina HD 4.7“(竖屏)', width: 750, height: 1334 },
    { name: 'Retina HD 5.5“(横屏)', width: 2208, height: 1242 },
    { name: 'Retina 4(竖屏)', width: 640, height: 1136 },
    { name: '2x(竖屏)', width: 640, height: 960 },
    { name: '1x(竖屏)', width: 320, height: 480 },
  ]
  return (
    <div className="container boot-page">
      <div className='start_flex'>
        <div className='flex_left'>
          <canvas
            className='canvas'
            style={{ height: 375 * sizeh / sizew + 'px' }}
            ref={canvasRef}
            width={sizew}
            height={sizeh}>
            您的浏览器不支持canvas，请更换浏览器.
          </canvas>
        </div>
        <Grid hoverable={false} className='flex_right'>
          <Row gutter={20}>
            <Col className='right_item'>
              <label className='item_title'>宽高</label>
              <Select
                className='item_select'
                defaultValue={sizew + ',' + sizeh}
                onChange={(e) => {
                  let arr = e.split(',')
                  setSizeh(parseInt(arr[1]))
                  setSizew(parseInt(arr[0]))
                }}>
                {sizeList.map((item, index) => (
                  <Select.Option
                    value={item.width + ',' + item.height}
                    key={index}>{item.name + ' ' + item.width + 'x' + item.height}</Select.Option>
                ))}
              </Select>
            </Col>
            <Col className='right_item'>
              <label className='item_title'>自定义宽高</label>
              <Input
                placeholder='宽'
                type='number'
                onChange={(e) => {
                  if (e.target.value === 0) return
                  setSizew(parseFloat(e.target.value))
                }}
                defaultValue={sizew}></Input>
              <Input
                placeholder='高'
                type='number'
                onChange={(e) => {
                  if (e.target.value === 0) return
                  setSizeh(parseFloat(e.target.value))
                }}
                defaultValue={sizeh}></Input>
            </Col>
          </Row>
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
            <label className='item_title'>图片大小(宽度占比/高度占比)</label>
            <Slider
              min={10}
              max={100}
              defaultValue={scale * 100}
              onChange={(e) => {
                setScale(e / 100)
              }}></Slider>
          </Col>
          <Col className='right_item'>
            <label className='item_title'>图片水平位置(宽度占比)</label>
            <Slider
              min={0}
              max={100}
              defaultValue={marginHorizontal * 100}
              onChange={(e) => {
                setMarginHorizontal(e / 100)
              }}></Slider>
          </Col>
          <Col className='right_item'>
            <label className='item_title'>图片竖直位置(高度占比)</label>
            <Slider
              min={0}
              max={100}
              defaultValue={marginVertical * 100}
              onChange={(e) => {
                setMarginVertical(e / 100)
              }}></Slider>
          </Col>
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

export default BootPage;
