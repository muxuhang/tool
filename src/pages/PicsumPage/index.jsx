/**
 * @description 获取Picsum网络图片
 */

import { Button, Empty, InputNumber, message, Spin } from "antd"
import { useState } from "react"
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

export default function PicsumPage() {
  const [photos, setPhotos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [photoConfig, setPhotoConfig] = useState({
    width: 300,
    height: 300,
    limit: 10,
    page: 1,
    blur: 0
  })
  const [progress, setProgress] = useState(0)
  const getPhotos = (photoConfig) => {
    if (!photoConfig.limit) {
      message.error('请输入每页几张')
      return
    }
    if (!photoConfig.page) {
      message.error('请输入第几页')
      return
    }
    const params = `?page=${photoConfig.page}&limit=${photoConfig.limit}`
    fetch(`https://picsum.photos/v2/list${params}`)
      .then((res) => res.json())
      .then(res => {
        setPhotos(res || [])
      }).catch(() => {
        message.error('请求失败')
      })
  }
  const onChange = (type, value) => {
    setPhotoConfig(config => ({ ...config, [type]: value }))
  }
  const config = `?${photoConfig.blur ? 'blur=' + photoConfig.blur : ''}`
  // 批量下载并打包
  const downloadBigPhotos = async (type = '') => {
    if (!photos.length) {
      message.error('请输入至少一个图片 URL')
      return
    }
    const urls = photos.map((photo) => {
      if (type === 'yuantu') {
        return photo.download_url
      } else {
        return `https://picsum.photos/id/${photo.id}/${photoConfig.width}/${photoConfig.height}${config}`
      }
    }).filter((url) => url)
    if (urls.length === 0) {
      message.error('URL 格式有误，请重新输入')
      return
    }
    setIsLoading(true)
    setProgress(0)
    const zip = new JSZip()
    try {
      for (const [index, url] of urls.entries()) {
        try {
          const response = await fetch(url)
          if (!response.ok) throw new Error(`无法下载图片: ${url}`)
          const blob = await response.blob()
          const fileName = `image_${index + 1}.${getFileExtension(url)}`
          setProgress(index + 1)
          zip.file(fileName, blob) // 添加文件到 ZIP
        } catch (error) {
          console.error(`下载失败: ${url}`, error)
        }
      }

      // 生成 ZIP 文件并下载
      zip.generateAsync({ type: 'blob' }).then((res) => {
        saveAs(res, type === 'yuantu' ? '原图.zip' : `${photoConfig.width}x${photoConfig.height}.zip`)
      })
    } catch (error) {
      console.error('打包失败:', error)
      alert('打包失败，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  // 获取文件扩展名
  const getFileExtension = (url) => {
    const match = url.match(/\.([a-zA-Z0-9]+)(?:\?|#|$)/)
    return match ? match[1] : 'jpg'
  }
  return <Spin spinning={isLoading} tip={`下载中，进度${progress}/${photos.length}`}>
    <div className="flex container m-auto">
      <div className="p-2 flex flex-col gap-2 w-3/12 border-r mr-2">
        <div className="flex items-center">
          <label className="w-24">图片宽度</label>
          <InputNumber value={photoConfig.width} onChange={(v) => onChange('width', v)}></InputNumber>
        </div>
        <div className="flex items-center">
          <label className="w-24">图片高度</label>
          <InputNumber value={photoConfig.height} onChange={(v) => onChange('height', v)}></InputNumber>
        </div>
        <div className="flex items-center">
          <label className="w-24">每页几张</label>
          <InputNumber min={0} max={20} value={photoConfig.limit} onChange={(v) => onChange('limit', v)}></InputNumber>
        </div>
        <div className="flex items-center">
          <label className="w-24">第几页</label>
          <InputNumber min={0} max={100} value={photoConfig.page} onChange={(v) => onChange('page', v)}></InputNumber>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button type='primary' onClick={() => getPhotos(photoConfig)}>获取图片</Button>
          {!!photos.length && <><Button onClick={() => downloadBigPhotos()}>下载图片</Button>
            <Button onClick={() => downloadBigPhotos('yuantu')}>下载原图</Button></>}
        </div>
        <div>图片来源<a href="https://picsum.photos/" target="_blank" rel="noreferrer">https://picsum.photos/</a></div>
      </div>
      <div className="flex flex-1 flex-wrap gap-2 m-2">
        {photos.length ? photos.map((item, key) => <div key={key} className="relative w-56 h-56 border border-dashed p-1">
          <img alt=""
            src={`https://picsum.photos/id/${item.id}/${photoConfig.width}/${photoConfig.height}${config}`}
            className="w-full h-full object-contain" />
        </div>) : <div className="m-auto"><Empty description='暂无数据'>
          <Button size="small" onClick={() => getPhotos(photoConfig)}>获取图片</Button>
        </Empty></div>}
      </div>
    </div>
  </Spin>
}