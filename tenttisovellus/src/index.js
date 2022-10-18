import React from 'react';
import ReactDOM from 'react-dom/client';
import './components/styles.css'
import Header from "./components/Header"
import Content from "./components/Content"
import Footer from "./components/Footer"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <Header/>
        <Content/>
        <Footer/>
    </div>
);
