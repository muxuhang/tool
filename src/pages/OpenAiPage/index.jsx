import { useXAgent, useXChat, Sender, Bubble } from '@ant-design/x'
import React from 'react'

const OpenAiPage = () => {
  const [agent] = useXAgent({
    request: async (info, callbacks) => {
      const { messages, message } = info
      const { onSuccess, onUpdate, onError } = callbacks
      console.log('message', message)
      console.log('messages', messages)
      try {
        fetch('http://127.0.0.1:8000/ai/qa/', {
          method: 'POST',
          body: JSON.stringify({
            question: message,
          })
        }).then((res) => res.json())
          .then((res) => {
            if (res.error) {
              onError(res.error)
            } else {
              onSuccess(res.answer)
            }
          })
      } catch (error) {
        onError(error)
      }
    },
  })
  const {
    onRequest,
    messages,
  } = useXChat({ agent })
  const items = messages.map(({ message, id }) => ({
    key: id,
    content: message,
  }))
  return (
    <div style={{ height: 'calc(100vh - 48px)' }}>
      <div className='container m-auto flex flex-col h-full p-2'>
        <div className='flex-1'>
          <Bubble.List items={items} />
        </div>
        <Sender onSubmit={onRequest} />
      </div>
    </div>
  )
}

export default OpenAiPage