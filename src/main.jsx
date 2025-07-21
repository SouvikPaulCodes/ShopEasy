import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './components/App'
import Home from './components/Home'
import TV from './components/Tv'
import Laptop from './components/Laptop'
import Gaming from './components/Gaming'
import Mobile from './components/Mobile'
import Cart from './components/Cart'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "tv",
        element: <TV />
      },
      {
        path: "laptop",
        element: <Laptop />
      },
      {
        path: "gaming",
        element: <Gaming />
      },
      {
        path: "mobile",
        element: <Mobile />
      },
      {
        path: "cart",
        element: <Cart />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
    <RouterProvider router={routes}/>
)
