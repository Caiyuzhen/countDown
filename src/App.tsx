// import React, { Component, Fragment } from 'react';
import React from 'react' 
import { hot } from 'react-hot-loader/root'//🔥在这个根组件内引入 hot 热更新组件！！
import './style/index.less'; //记得引入 less , 否则打包会找不到
import SmartBlock from './functions/newBlock';



// class App extends Component {
//   render(){
//     return (
//       <Fragment>
//         <div>Hello React & Ts</div>
//       </Fragment>
//     )
//   }
// }

class App extends React.Component {
    render(){
      return(
        <>
          <div>Hello React & Ts
          </div>
          <SmartBlock />
        </>
      )
    }
}


export default hot(App);//🔥热更新 root: 把「App」组件放到根组件内！！
