const bcrypt = require('bcrypt');

class Router {
    constructor(app , conexao){
        this.login(app,conexao);
        this.logout(app,conexao);
        this.isLoggedIn(app,conexao);
        this.cadastrar(app,conexao);
        this.favoritar(app,conexao);
        this.favoritarUser(app,conexao);
    }
    
    
    login(app,conexao){
        app.post('/login',(req,res) =>{
            let username = req.body.username;
            let password = req.body.password;
            username = username.toLowerCase();

            if (username.length >12 || password.length > 12 ){
                res.json({
                    sucess:false,
                    msg:'Porfavor tente novamente'
                })
                return;
            }
            let cols = [username];
            conexao.query('SELECT * from login where username = ? limit 1' , cols , (err , data , fields) =>{
                    if(err){
                        res.json({
                            sucess: false,
                            msg:'Erro , tente novamente'
                        });
                        return;
                    }
                    if(data && data.length ===1){
                        bcrypt.compare(password , data[0].password , (bcryptErr , verified) =>{
                            if (verified){
                                req.session.userID = data[0].id;
                                res.json({
                                    sucess:true,
                                    username: data[0].username
                                    
                                })
                                
                                return;
                            }
                            else{
                                res.json({
                                    sucess:false,
                                    msg:'Senha invalida'
                                })
                            }
                        });

                    }else{
                        res.json({
                            sucess:false,
                            msg: 'Usuario inexistente'
                        })
                    }
            });
            
        });

    }
    logout(app,conexao){
        app.post('/logout',(req,res )=>{
            if(req.session.userID){
                req.session.destroy();
                res.json({
                    sucess:true

                })
                return true;
            }
            else{
                res.json({
                    sucess:false
                    
                })
                return false;
            }
        })
        

    }
    isLoggedIn(app,conexao){
        app.post('/isLoggedIn',(req,res) =>{
            if(req.session.userID){
                let cols = [req.session.userID];
                conexao.query('select * from login id = ? limit 1', cols,(err, data,fields)=>{
                    if(data && data.length ===1){
                        res.json({
                            sucess:true,
                            username: data[0].username
                            

                        });
                        return true;
                    }else{
                        res.json({
                            sucess:false
                        });
                    }
                });
            }
            else{
                res.json({
                    sucess:false
                })
            }
        });

    }
    cadastrar(app,conexao){
        app.post('/cadastrar',(req,res) =>{
            let username = req.body.username;
            let password = req.body.password;
            username = username.toLowerCase();

            if (username.length >12 || password.length > 12 ){
                res.json({
                    sucess:false,
                    msg:'Porfavor tente novamente'
                })
                return;
            }
            let cols = [username];
            conexao.query('SELECT * from login where username = ? limit 1' , cols , (err , data , fields) =>{
                    if(err){
                        res.json({
                            sucess: false,
                            msg:'Erro , tente novamente'
                        });
                        return;
                    }
                    if(data && data.length ===1){
                        res.json({
                            sucess:false,
                            msg: 'Usuario Existente'
                        })
                        

                    }else{
                        let user = [username];
                        let pswrd = bcrypt.hashSync(password,9);
                        conexao.query('insert into login (username ,password) values( ?, ?)',[user,pswrd],(err) =>{
                            if(err){
                                res.json({
                                    sucess: false,
                                    msg:'Erro , tente novamente'
                                });
                                return;
                            }
                            res.json({
                                sucess:true
                            })
                            
                        });

                        
                    }
            });
            
        });

    }
    favoritar(app,conexao){
        app.post('/favoritar',(req,res) =>{
            let idSerie = req.body.id_serie;
            let cols = [req.session.userID];
            console.log(cols)
            conexao.query('select id_serie from favoritar where id_serie = ? limit 1',idSerie, (err ,data) =>{
                if(err){
                    res.json({
                        
                        msg:'Erro , tente novamente'
                    });
                }
                if(data && data.length ===1){
                    conexao.query('DELETE FROM favoritar WHERE id_serie = ?', idSerie,(err ) =>{
                        if(err){
                            res.json({
                                
                                msg:'Erro , tente novamente'
                            });
                        }
                    })
                   
                }else{
                    conexao.query('insert into favoritar (id_serie,id_username ) values( ?, ?)', [idSerie,cols],(err) =>{
                        if(err){
                            console.log("inserido")
                            res.json({
                                
                                msg:'Erro , tente novamente'
                            });
                        }
                    });
                }
    
      
    });
})

}

        favoritarUser(app,conexao){
            app.get('/favoritarUser',(req,res) =>{
                
                let cols = [req.session.userID];
                conexao.query('select id_serie from favoritar where id_username = ? ',cols, (err ,result) =>{
                    if(err){
                        res.json({
                            
                            msg:'Erro , tente novamente'
                        });
                       

                    } res.json({
                        result
                     });
                });
            });
        }
}

module.exports = Router;