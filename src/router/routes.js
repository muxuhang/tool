import ChineseChessPage from '@/pages/ChineseChessPage'
import CutImagePage from '@/pages/CutImagePage'
import HomePage from '@/pages/HomePage'
import OpenAiPage from '@/pages/OpenAiPage'
import PicsumPage from '@/pages/PicsumPage'
import QrCodeCreatePage from '@/pages/QrCodeCreatePage'
import QrCodeParsePage from '@/pages/QrCodeParsePage'

const routes = [
  {
    path: '/',
    exact: true,
    element: <HomePage />,
  },
  {
    path: '/qrcode-create',
    element: <QrCodeCreatePage />,
  },
  {
    path: '/qrcode-parse',
    element: <QrCodeParsePage />,
  },
  {
    path: '/cut-image',
    element: <CutImagePage />,
  },
  {
    path: '/picsum',
    element: <PicsumPage />,
  },
  {
    path: '/chinese-chess',
    element: <ChineseChessPage />,
  },
  {
    path: '/openai',
    element: <OpenAiPage />,
  },
]

export default routes
