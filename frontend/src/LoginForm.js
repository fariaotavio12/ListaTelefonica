import React from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import UserStore from './stores/UserStore';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";


/**
 * 
 */
class LoginForm extends React.Component {
    /**
     * 
     * @param {*Propriedade que o constructor vai receber} props 
     */
    constructor(props){

        super(props);
        this.state = {
            nome:'',
            tel_residencial: '',
            tel_celular: '',
            email: '',
            rede_social:'',
            buttonDisabled:false
        }
    }
    /**
     * 
     * @param {*E a variavel que receber o set} property 
     * @param {*val e o a variavel para confirmar o if} val 
     * @returns 
     */
    setInputValue(property, val){
        val = val.trim();
        if(val.length > 120){
            return;
        }
        this.setState({
            [property]: val
        })
    }
    resetForm(){
        this.setState({
            nome:'',
            tel_residencial: '',
            tel_celular: '',
            email: '',
            rede_social:'',
            buttonDisabled: false
        })
    }
    async doLogin(){
        if(!this.state.nome){
            return;
        }
        if(!this.state.tel_residencial){
            return;
        }
        if(!this.state.tel_celular){
            return;
        }
        if(!this.state.email){
            return;
        }
        if(!this.state.rede_social){
            return;
        }

        this.setState({
            buttonDisabled: true
        })
        try{
           
            
             
            
            let res = await fetch('/AdicionaLista',{
                method:'post',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    nome:this.state.nome,
                    tel_residencial:this.state.tel_residencial,
                    tel_celular:this.state.tel_celular,
                    email:this.state.email,
                    rede_social:this.state.rede_social
                    
                })
            });
            /**conferindo se deu tudo certo. */
            let result = await res.json();
            if (result && result.sucess === true){
                this.resetForm();
                alert("Adicionado na lista com sucesso");
            }
        }
        catch(e){
            console.log(e);
            this.resetForm();

        }
    }
  

render (){
    return (
        <div>
            <br></br>
            <div className = "container ">
            <div className = "link">

                <div className = "submitButton">
                <Link to="/" className = "classe1" >Lista Telefonica</Link></div>
                </div>
                <br></br>
                <div className="loginForm">
                    <br></br>
                    <br></br>
                    <br></br>
                    <InputField
                        type='text'
                        placeholder='Digite o nome'
                        Value={this.state.nome ? this.state.nome : ''}
                        onChange={ (val) => this.setInputValue('nome' , val)}
                    />
                    <InputField
                        type='text'
                        placeholder='Digite o telefone residencial'
                        Value={this.state.tel_residencial ? this.state.tel_residencial : ''}
                        onChange={ (val) => this.setInputValue('tel_residencial' , val)}
                    />
                    <InputField
                        type='text'
                        placeholder='Digite o telefone celular'
                        Value={this.state.tel_celular ? this.state.tel_celular : ''}
                        onChange={ (val) => this.setInputValue('tel_celular' , val)}
                    />
                    <InputField
                        type='text'
                        placeholder='Digite o email'
                        Value={this.state.email ? this.state.email : ''}
                        onChange={ (val) => this.setInputValue('email' , val)}
                    />
                    <InputField
                        type='text'
                        placeholder='Digite a rede social'
                        Value={this.state.rede_social ? this.state.rede_social : ''}
                        onChange={ (val) => this.setInputValue('rede_social' , val)}
                    />
                    
                    <SubmitButton
                        text='Adicionar na lista'
                        disabled={this.state.buttonDisabled}
                        onClick={ () => this.doLogin()}
                    />
                 </div>
            </div>
      </div>
    );

}
}
  
/*<link to='/cadastrar'>Cadastrar</link>*/
export default LoginForm;


