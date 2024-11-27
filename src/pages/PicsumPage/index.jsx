/**
 * @description 获取Picsum网络图片
 */

import { Button, Form, Input } from "antd"
import { useEffect, useState } from "react"

export default function PicsumPage() {
  const [photos, setPhotos] = useState([])
  const [photoConfig, setPhotoConfig] = useState({
    width: 300,
    height: 300,
    blur: 0
  })
  const getPhotos = () => {
    const params = `?page=2&limit=10`
    fetch(`https://picsum.photos/v2/list${params}`)
      .then((res) => res.json())
      .then(res => {
        setPhotos(res || [])
      })
  }
  useEffect(() => {
    getPhotos()
  }, [])
  const onChange = (e) => {
    const value = e.target.value
    const type = e.currentTarget.name
    if (!value) return
    setPhotoConfig(config => ({ ...config, [type]: value }))
  }
  const config = `?${photoConfig.blur ? 'blur=' + photoConfig.blur : ''}`
  return <div>
    <div className="flex flex-wrap gap-2 m-2">
      {photos.map((item, key) => <div key={key} className="relative w-56 h-56 border border-dashed p-1">
        <img alt=""
          src={`https://picsum.photos/id/${item.id}/${photoConfig.width}/${photoConfig.height}${config}`}
          className="w-full h-full object-contain" />
      </div>)}
    </div>
    <div className="p-2 flex flex-col gap-2">
      <Form className="flex flex-col gap-2">
        <div className="flex items-center">
          <label className="w-24">图片宽度</label>
          <Input name="width" type="number" defaultValue={photoConfig.width}></Input>
        </div>
        <div className="flex items-center">
          <label className="w-24">图片高度</label>
          <Input name="height" type="number" defaultValue={photoConfig.height}></Input>
        </div>
        <div className="flex gap-2">
          <Button>切换图片</Button>
          <Button type='primary'>确定</Button>
        </div>
      </Form>
      <div className="flex gap-2 pt-2 border-t">
        <Button>下载图片</Button>
        <Button>下载原图</Button>
      </div>
    </div>
  </div>
}