import React, { useLayoutEffect } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layout } from './Layout';
import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { Studio } from './pages/Studio';
import { Contact } from './pages/Contact';
import { ErrorPage } from './pages/ErrorPage';
import { NotFound } from './pages/NotFound';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Use HashRouter to ensure compatibility with preview environments that serve from subpaths
const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "work",
        element: <Work />,
      },
      {
        path: "studio",
        element: <Studio />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "*",
        element: <NotFound />,
      }
    ],
  },
]);

const App: React.FC = () => {
  useLayoutEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return <RouterProvider router={router} />;
};

export default App;