const bcrypt = require('bcrypt');

class Router {
    constructor(app , conexao){
        this.buscarLista(app,conexao);
        this.adicionaLista(app,conexao);
    }
    
        buscarLista(app,conexao){
            app.get('/BuscarLista',(req,res) =>{
                
                conexao.query('select * from numeros', (err ,result) =>{
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
        adicionaLista(app,conexao){
            app.post('/adicionaLista',(req,res) =>{
                let nome = req.body.nome;
                let tel_residencial = req.body.tel_residencial;
                let tel_celular = req.body.tel_celular;
                let email = req.body.email;
                let rede_social = req.body.rede_social;
     
    
                if (tel_residencial.length >120 || tel_celular.length > 120 ||  email.length > 120 || rede_social.length > 120){
                    res.json({
                        sucess:false,
                        msg:'Porfavor tente novamente'
                    })
                    return;
                }
                
                conexao.query('insert into numeros (nome, tel_residencial ,tel_celular, email, rede_social) values( ?, ?, ?, ?, ?)',[nome, tel_residencial,tel_celular,email,rede_social],(err) =>{
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
    )}
}

module.exports = Router;