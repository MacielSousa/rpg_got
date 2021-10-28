function UsuarioDAO(connection){
   this._connection = connection();
}

UsuarioDAO.prototype.inserirUsuario = function(usuario, res){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("usuarios", function(err, collection){
            collection.insert(usuario);
            mongoclient.close();
        });
    });
}

UsuarioDAO.prototype.autenticar = function(usuario, req, res){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("usuarios", function(err, collection){
            collection.find(usuario).toArray(function(err, result){
                if(result[0] != undefined){
                    req.session.autorizado = true;
                    req.session.usuario = result[0].usuario;
                    req.session.casa = result[0].casa;
                }
                if(result[0] != undefined){
                    res.redirect("jogo");
                }else{
                    res.render('index', {validacao: [{msg : 'usuário ou senha inválidos'}], dadosForm: usuario});
                }
            });
            mongoclient.close();
        });
    });
}

module.exports = function(){
    return UsuarioDAO;
}