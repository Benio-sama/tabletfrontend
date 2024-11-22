import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { Kartyak } from './components/Kartyak'
import { Lista } from './components/Lista'
import { Felvetel } from './components/Felvetel'
import { Torles } from './components/Torles'
import { Modositas } from './components/Modositas'
import { Minden } from './components/Minden'

const router = createBrowserRouter([
  {
    path: "/",
    element: <>
      <h1>Go to the <a href='/kezdolap'>main menu</a></h1>
    </>,
  },
  {
    path: "/kezdolap",
    element: <Kartyak />,
  },
  {
    path: "/tabletek-lista",
    element: <Lista />,
  },
  {
    path: "/tabletek-felvetel",
    element: <Felvetel />,
  },
  {
    path: "/tabletek-torles",
    element: <Torles />,
  },
  {
    path: "/tabletek-modosit",
    element: <Modositas />,
  },
  {
    path: "/tabletekfullcrud",
    element: <Minden />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
