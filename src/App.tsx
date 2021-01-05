import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom';
import Login from './Pages/Login'
import Home from './Pages/Home'
import 'antd/dist/antd.css';

const App: React.FC = () => {
  return <>
    <HashRouter>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/login" exact component={Login}></Route>
      </Switch>
    </HashRouter>
  </>
}

export default App