import React from 'react';
import {observer} from 'mobx-react';
import UserStore from './stores/UserStore';
import LoginForm from './LoginForm';

import PaginaInicial from './PaginaInicial';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  BrowserRouter
} from "react-router-dom";

import './App.css';


class App extends React.Component {


  render (){
   
    return (
      <div className="container">
          <BrowserRouter>
        <Switch>
          <Route path="/" exact component={PaginaInicial} />
          <Route path="/Adiciona"component={LoginForm} />

        </Switch>
    </BrowserRouter>
      </div>
     
  );
}
  
}
export default observer(App);
