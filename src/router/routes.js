import CutImagePage from '@/pages/CutImagePage'
import BootPage from '@/pages/BootPage'
import HomePage from '@/pages/HomePage'
import QrCodePage from '@/pages/QrCodePage'

const routes = [
  {
    path: '/',
    exact: true,
    element: <HomePage />,
  },
  {
    path: '/boot',
    element: <BootPage />,
  },
  {
    path: '/qrcode',
    element: <QrCodePage />,
  },
  {
    path: '/cut-image',
    element: <CutImagePage />,
  },
]

export default routes
