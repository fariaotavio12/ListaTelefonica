import React from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import UserStore from './stores/UserStore';
import LoginForm from './LoginForm';
import {
    BrowserRouter as Router,
   
    Link,
    
  } from "react-router-dom";
  import FunctionPaginaFavorito from './FunctionPaginaFavorito';

class PaginaInicial extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            buttonDisabled:false
        }
    }
  render (){

    return (
        <div>
            {<FunctionPaginaFavorito/>}
      </div>
    );
  }
}

export default PaginaInicial;
