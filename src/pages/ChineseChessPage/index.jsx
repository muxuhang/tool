import React, { useCallback, useEffect, useRef, useState } from "react"

function ChineseChessPage() {
  const canvasRef = useRef()
  const canvasWidth = 580 // 棋盘宽度
  const canvasHeight = 620 // 棋盘高度
  const begin = 40 // 棋盘边界 (X轴)
  const grid = 60 // 棋盘格子大小
  const size = 50 // 棋子大小

  // 存储棋子信息
  const [pieces, setPieces] = useState([
    // 红方棋子
    { type: "车", x: 0, y: 0, color: "red" },
    { type: "马", x: 1, y: 0, color: "red" },
    { type: "象", x: 2, y: 0, color: "red" },
    { type: "士", x: 3, y: 0, color: "red" },
    { type: "帅", x: 4, y: 0, color: "red" },
    { type: "士", x: 5, y: 0, color: "red" },
    { type: "象", x: 6, y: 0, color: "red" },
    { type: "马", x: 7, y: 0, color: "red" },
    { type: "车", x: 8, y: 0, color: "red" },

    { type: "炮", x: 1, y: 2, color: "red" },
    { type: "炮", x: 7, y: 2, color: "red" },

    { type: "兵", x: 0, y: 3, color: "red" },
    { type: "兵", x: 2, y: 3, color: "red" },
    { type: "兵", x: 4, y: 3, color: "red" },
    { type: "兵", x: 6, y: 3, color: "red" },
    { type: "兵", x: 8, y: 3, color: "red" },

    // 黑方棋子
    { type: "车", x: 0, y: 9, color: "black" },
    { type: "马", x: 1, y: 9, color: "black" },
    { type: "象", x: 2, y: 9, color: "black" },
    { type: "士", x: 3, y: 9, color: "black" },
    { type: "将", x: 4, y: 9, color: "black" },
    { type: "士", x: 5, y: 9, color: "black" },
    { type: "象", x: 6, y: 9, color: "black" },
    { type: "马", x: 7, y: 9, color: "black" },
    { type: "车", x: 8, y: 9, color: "black" },

    { type: "炮", x: 1, y: 7, color: "black" },
    { type: "炮", x: 7, y: 7, color: "black" },

    { type: "兵", x: 0, y: 6, color: "black" },
    { type: "兵", x: 2, y: 6, color: "black" },
    { type: "兵", x: 4, y: 6, color: "black" },
    { type: "兵", x: 6, y: 6, color: "black" },
    { type: "兵", x: 8, y: 6, color: "black" },
  ])

  // 当前选中的棋子
  const [selectedPiece, setSelectedPiece] = useState(null)

  // 绘制棋子
  const drawPieces = useCallback(
    (ctx) => {
      pieces.forEach((piece) => {
        const { type, x, y, color } = piece
        const posX = begin + x * grid
        const posY = begin + y * grid

        // 如果是选中的棋子，绘制选中效果
        if (selectedPiece && selectedPiece.x === x && selectedPiece.y === y) {
          ctx.beginPath()
          ctx.lineWidth = 3
          ctx.strokeStyle = "orange"
          ctx.arc(posX, posY, size / 2, 0, 1 * Math.PI)
          ctx.stroke()
        }

        // 绘制棋子背景
        ctx.beginPath()
        ctx.fillStyle = color === "red" ? "#f5c6aa" : "#d9d9d9"
        ctx.arc(posX, posY, size / 2, 0, 2 * Math.PI)
        ctx.fill()
        ctx.stroke()

        // 绘制棋子文字
        ctx.fillStyle = color
        ctx.font = "20px serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(type, posX, posY)
      })
    },
    [pieces, selectedPiece]
  )

  // 绘制棋盘
  const drawChessboard = useCallback(async () => {
    const canvas = canvasRef.current
    if (canvas.getContext) {
      let ctx = canvas.getContext("2d")

      // 棋盘背景
      ctx.fillStyle = "#f1be6a"
      ctx.fillRect(0, 0, canvasWidth, canvasHeight)

      // 绘制格子
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 9; j++) {
          let itemBeginRow = begin + grid * i
          let itemBeginCol = begin + grid * j
          ctx.strokeRect(itemBeginRow, itemBeginCol, grid, grid)
        }
      }

      // 绘制楚河汉界
      ctx.fillStyle = "#f1be6a"
      ctx.fillRect(begin, begin + grid * 4, grid * 8, grid)

      ctx.fillStyle = "black"
      ctx.font = "32px serif"
      ctx.textAlign = "center"
      ctx.strokeText("楚河", begin + grid * 3, begin + grid * 4.45)
      ctx.strokeText("汉界", begin + grid * 5, begin + grid * 4.45)

      // 绘制棋子
      drawPieces(ctx)
    }
  }, [drawPieces])

  useEffect(() => {
    drawChessboard()
  }, [drawChessboard])

  // 获取鼠标点击位置
  const getEventPosition = (ev) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()  // 获取canvas相对于页面的位置
    const x = ev.clientX - rect.left  // 计算x坐标
    const y = ev.clientY - rect.top   // 计算y坐标
    return { x, y }
  }

  // 处理棋子点击
  const handleClick = (e) => {
    const { x, y } = getEventPosition(e)

    // 计算点击的格子坐标
    const gridX = Math.floor((x - begin + grid / 2) / grid)
    const gridY = Math.floor((y - begin + grid / 2) / grid)

    // 检查点击的坐标是否在棋盘范围内
    if (gridX < 0 || gridX >= 9 || gridY < 0 || gridY >= 10) {
      // 如果点击超出了棋盘范围，则不做任何操作
      return
    }

    // 查找被点击的棋子
    const clickedPiece = pieces.find(
      (piece) => piece.x === gridX && piece.y === gridY
    )

    if (clickedPiece) {
      // 如果点击了一个棋子，选中它
      setSelectedPiece(clickedPiece)
    } else if (selectedPiece) {
      // 如果点击了空白格子，移动选中的棋子
      const updatedPieces = pieces.map((piece) => {
        if (piece === selectedPiece) {
          return { ...piece, x: gridX, y: gridY } // 更新棋子的位置
        }
        return piece
      })
      setPieces(updatedPieces)
      setSelectedPiece(null) // 移动后取消选中
    }
  }


  return (
    <div className="container chinese-chess">
      <canvas
        className="chess"
        ref={canvasRef}
        onClick={handleClick}
        height={canvasHeight}
        width={canvasWidth}
      >
        您的浏览器不支持 canvas
      </canvas>
    </div>
  )
}

export default ChineseChessPage
