import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createBrowserRouter , RouterProvider} from "react-router-dom";
import Inicio from './componentes/Inicio' 

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
  }
,]
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
