import { Upload } from 'antd';
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import './qr-code.scss';
function QrCode() {
  const [source, setSource] = useState(null)
  // 修改图标
  const handleChange = info => {
    const reader = new FileReader();
    reader.addEventListener('load', () => setSource(reader.result));
    reader.readAsDataURL(info.file.originFileObj);
  };
  // canvas 转图片并下载
  // const CanvasToImage = () => {
  //   const canvas = document.getElementById('qrcode')
  //   const dom = document.createElement("a");
  //   const image = new Image();
  //   image.src = canvas.toDataURL("image/png");
  //   dom.href = image.src
  //   dom.download = new Date().getTime() + ".png";
  //   dom.click();
  // }

  return (
    <div className="container qr-code">
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        onChange={handleChange}
        customRequest={() => null}
      >
        {source ? <img id='source' src={source} alt='' style={{ width: '100%' }} /> : (
          <>
          <PlusOutlined />
          </>
        )}
      </Upload>
    </div >
  );
}

export default QrCode;
