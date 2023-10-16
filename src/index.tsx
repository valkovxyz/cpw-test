import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "@fontsource/space-mono";
import "@fontsource/orbitron"
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ConnectWallet} from "./pages/ConnectWallet/ConnectWallet";
import {CreateHero} from "./pages/CreateHero/CreateHero";
import App from "./App";
import {Provider} from "react-redux";
import store from "./store/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/connect-wallet",
    element: <ConnectWallet/>
  },
  {
    path: "/create-hero",
    element: <CreateHero/>
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
