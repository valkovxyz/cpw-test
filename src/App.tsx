import React, {useEffect} from 'react';
import './App.css';
import Layout from "./components/layout";
import {useNavigate} from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const wallet = localStorage.getItem('wallet')
  useEffect(() => {
    if (!wallet) {
      navigate('/connect-wallet')
    }
    if (wallet) {
      navigate('/create-hero')
    }
  }, [wallet]);
  return (
    <Layout>
      <div>Home</div>
    </Layout>
  );
}

export default App;
