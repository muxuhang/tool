import React, { useEffect, useRef } from 'react';
import './chinese-chess.scss'
function ChineseChess() {
  const canvasRef = useRef()
  const canvasWidth = 560       //棋盘宽度
  const canvasHeight = 620      //棋盘高度
  const begin = 40           //棋盘主题开始位置(棋盘边界)(X轴)
  const grid = 60         //棋盘格子大小
  // grid*8+begin*2 = canvasWidth
  // grid*9+begin*2 = canvasHeight
  useEffect(() => {
    drawChessboard()
  }, [])
  // 绘制格子
  const drawGrid = (ctx, i, j, row, col) => {
    ctx.font = '30px serif';
    ctx.textAlign = 'center';
    ctx.strokeText(i + ',' + j, row + 30, col + 40, 60);
    ctx.strokeRect(row, col, grid, grid);
  }
  // 绘制 ‘九宫’
  const drawNineGrid = (ctx, i, j, row, col) => {
    if ((i >= 3 && i <= 4) && (j <= 1 || j >= 7)) {
      ctx.beginPath();
      if ((i === 4 && (j === 0 || j === 7)) || (i === 3 && (j === 1 || j === 8))) {
        ctx.moveTo(row, col + grid);
        ctx.lineTo(row + grid, col);
      } else {
        ctx.moveTo(row, col);
        ctx.lineTo(row + grid, col + grid);
      }
      ctx.stroke();
    } else {
      ctx.lineWidth = 1;
    }
  }
  // 绘制楚河汉界
  const drawTheBattlefield = (ctx) => {
    ctx.fillStyle = '#f1be6a'
    ctx.fillRect(begin + 1, begin + grid * 4 + 1, grid * 8 - 2, grid - 2)
    ctx.font = '32px serif';
    ctx.textAlign = 'center';
    ctx.strokeText('楚河', begin + grid * 3, begin + grid * 4.65);
    ctx.strokeText('汉界', begin + grid * 5, begin + grid * 4.65);
  }
  // 绘制炮架
  const drawGunCarriage = (ctx, i, j) => {
    if (
      ((i === 6 || i === 0) && (j == 1 || j == 6)) ||
      ((j === 2 || j === 5) && i % 2 && i < 7)
    ) {
      let scale = 0.25
      let size = grid * scale,
        x = i * grid + grid * (1 - scale),
        y = j * grid + grid * (1 - scale)
      for (let n in [1, 2, 3, 4]) {
        ctx.fillStyle = '#333333'
        ctx.fillRect(
          begin + x + (n % 2 ? size + 2 : 0),
          begin + y + (n < 2 ? size + 2 : 0),
          size - 2,
          size - 2)
        ctx.fillStyle = '#f1be6a'
        ctx.fillRect(
          begin + x + (n % 2 ? size + 4 : 0),
          begin + y + (n < 2 ? size + 4 : 0),
          size - 4,
          size - 4)
      }
    }
  }
  // 绘制棋盘
  const drawChessboard = async () => {
    const canvas = canvasRef.current
    if (canvas.getContext) {
      var ctx = canvas.getContext("2d");
      // 棋盘背景
      ctx.fillStyle = '#f1be6a'
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 9; j++) {
          let itemBeginRow = begin + grid * i
          let itemBeginCol = begin + grid * j
          drawGrid(ctx, i, j, itemBeginRow, itemBeginCol)
          drawNineGrid(ctx, i, j, itemBeginRow, itemBeginCol)
          drawGunCarriage(ctx, i, j)
        }
      }
      await drawTheBattlefield(ctx)
      drawJJ(ctx)
    }
  }

  // 绘制棋子可移动坐标
  const drawJJ = (ctx) => {
    ctx.beginPath();
    ctx.fillStyle = 'black'
    ctx.transform(1, 0, 0, 1, grid, 0);
    ctx.arc(begin, begin, grid * 0.4, 0, 2 * Math.PI);
    ctx.fill();
  }

  const getEventPosition = (ev) => {
    var x, y;
    if (ev.layerX || ev.layerX == 0) {
      x = ev.layerX;
      y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) { // Opera
      x = ev.offsetX;
      y = ev.offsetY;
    }
    return { x: x, y: y };
  }

  return (
    <div className="container chinese-chess">
      <canvas
        className='chess'
        id='chess'
        ref={canvasRef}
        onClick={(e) => {
          console.log(e);
          let p = getEventPosition(e);
          console.log(p);
        }}
        height={canvasHeight}
        width={canvasWidth}>
        您的浏览器不支持canvas
      </canvas>
    </div>
  );
}

export default ChineseChess;
