import React from 'react';

import {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
   
    Link,
    
  } from "react-router-dom";


  export default function FunctionPaginaFavorito(){

    /**Get no banco de dados. */
    const [ loadIsListaTelefonica, setListaTelefonica ] = useState([]);
    useEffect(()=>{
        async function getIsFavorite(){
          const idFavoritedShows = []
          console.log("Buscando favoritos")
          
          const res = await fetch('/BuscarLista', { 
            method:'get',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
           });
           const {result} = await res.json();
           console.log(result);
          if(result){
            
            setListaTelefonica(result)
            
          }
          
        }
        
        getIsFavorite()
        
      },[]);
   
    /**Lendo o get do banco de dados e adicionando ele no frontend. */  
    return (
        <div className="container">
            <br></br>
            
            <div className = "link">

             
             <div className = "submitButton">
             <Link to="/adiciona" className = "classe1" >Adicionar na lista</Link></div>
             
            
             <br></br>
      </div>
      <br></br>
      <div className="loginForm">
          
          <table border="1">
                <tr>
                    <td>Nome</td>
                    <td>Telefone Residencial</td>
                    <td>Telefone Celular</td>
                    <td>Email</td>
                    <td>Rede social</td>
                </tr>
                <tr>
                    <td>Ted</td>
                    <td>Ted</td>
                    <td>22</td>
                    <td>Estudante</td>
                    <td>Estudante</td>

                </tr>
                <tr>
                    <td>Ted</td>
                    <td>Ralf</td>
                    <td>26</td>
                    <td>Designerasdasas.cm</td>
                    <td>Estudanteasdasd</td>
                </tr>
                
                {loadIsListaTelefonica.map((lista) => (
                  
                  
                  <tr>
                    <td>{lista.nome}</td>
                    <td>{lista.tel_residencial}</td>
                    <td>{lista.tel_celular}</td>
                    <td>{lista.email}</td>
                    <td>{lista.rede_social}</td>
                </tr>
                ))}
                
            </table>
           
             
                
            
      </div>
      <br></br>
      </div>
    );
  }



