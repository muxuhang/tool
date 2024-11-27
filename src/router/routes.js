import CutImagePage from '@/pages/CutImagePage'
import HomePage from '@/pages/HomePage'
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
]

export default routes
