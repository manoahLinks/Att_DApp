import { useState } from 'react'

import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom'

// library imports
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Main } from './layouts'
import { Dashboard } from './pages'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main/>,
      children: [
        {
          index: true,
          element: <Dashboard/>
        }
      ]
    }
  ])
  
  return (
    
    <>
      <RouterProvider router={router}/>
      <ToastContainer/>
    </>
    
  )
}

export default App
