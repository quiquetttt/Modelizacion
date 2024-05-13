import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createBrowserRouter , RouterProvider} from "react-router-dom";
import Inicio from './componentes/Inicio' 
import Decision from './componentes/Decision'
import Final from './componentes/Final'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/Inicio",
    element: <Inicio/>,
  },
  {
    path : "/Inicio/:nombre",
    element: <Decision/>,
  },
  {
    path: "/Final",
    element: <Final/>,
  },
]
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);
