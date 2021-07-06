
const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const Router = require('./Router');


app.use(express.static(path.join(__dirname,'build')));
app.use(express.json());

console.log('testindo');


    const conexao = mysql.createConnection('mysql://root:abc147abc1@localhost:3306/listaTelefonica');
    console.log('Mysql conectado.');



conexao.connect(function(error){
    if(!!error){
      console.log(error);
    }else{
      console.log('Connected!:)');
    }
  });

const sessionStore = new MySQLStore({
    expiration:(1825 * 86400 * 1000),
    endConnectionOnClose: false

},conexao);
app.use(session({
    key:'4289thgub4390ghejgbsdifhsd',
    secret: 'zxcasdqweasdzxcasqww',
    store: sessionStore,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:(1825 * 86400 * 1000),
        httpOnly:false
    }
}));

new Router(app , conexao);


app.get('/' , function(req,res){
    
    res.sendFile(path.join(__dirname,'build','index.html'));
    

});


app.listen(3000);





