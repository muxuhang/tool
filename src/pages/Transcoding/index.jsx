import React, { useEffect, useState } from 'react'
import TextArea from 'antd/lib/input/TextArea'
import { Divider, Radio } from 'antd'

export default function Transcoding(params) {
  const [main, setMain] = useState('native')
  const [editing, setEditing] = useState(false)
  const [native, setNative] = useState('')
  const [unicode, setUnicode] = useState('')

  useEffect(() => {
    if (editing === 'native') {
      nativeToUniCode()
    }
    if (editing === 'unicode') {
      uniCodeToNative()
    }
  }, [unicode, native, editing])
  // 文本转unicode
  const nativeToUniCode = () => {
    var ret = ''
    for (var i = 0; i < native.length; i++) {
      ret += '\\u' + native.charCodeAt(i).toString(16)
    }
    setUnicode(ret)
  }
  const uniCodeToNative = () => {
    console.log('uniCodeToNative')
    try {
      const str = eval("'" + unicode + "'")
      console.log(str)
    } catch (error) {
      console.log('error', error)
    }
  }

  const editList = [
    {
      title: 'native',
      value: native,
      onChange: (e) => setNative(e.target.value),
    },
    {
      title: 'unicode',
      value: unicode,
      onChange: (e) => setUnicode(e.target.value),
    },
  ]
  return (
    <div className='container'>
      <Radio.Group
        value={main}
        onChange={(e) => setMain(e.target.value)}>
        {editList.map((item) => (
          <Radio.Button
            key={item.title}
            value={item.title}>
            {item.title}
          </Radio.Button>
        ))}
      </Radio.Group>
      {editList.map((item, index) => {
        return (
          <div key={index}>
            <Divider>{item.title}</Divider>
            <TextArea
              placeholder='请输入'
              value={item.value}
              disabled={main !== item.title}
              onChange={(e) => {
                setEditing(item.title)
                item.onChange(e)
                setTimeout(() => {
                  setEditing(false)
                }, 300)
              }}></TextArea>
          </div>
        )
      })}
    </div>
  )
}
