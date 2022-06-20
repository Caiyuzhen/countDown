import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.less';
import App from './App';




//🌟核心渲染模块
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  
//   <React.StrictMode>
    <App />
//   </React.StrictMode>
);



