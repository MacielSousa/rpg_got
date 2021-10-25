function UsuarioDAO(connection){
   this._connection = connection();
}

UsuarioDAO.prototype.inserirUsuario = function(usuario){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("usuarios", function(err, collection){
            collection.insert(usuario);
            mongoclient.close();
        });
    });
    console.log(this._connection);
}

UsuarioDAO.prototype.autenticar = function(usuario, req, res){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("usuarios", function(err, collection){
            collection.find(usuario).toArray(function(err, result){
                console.log(result);
                if(result[0] != undefined){
                    req.session.autorizado = true;
                    req.session.usuario = result[0].usuario;
                    req.session.casa = result[0].casa;
                }
                if(result[0] != undefined){
                    res.redirect("jogo");
                }else{
                    res.render("index", {validacao: {}});
                }
            });
            mongoclient.close();
        });
    });
    console.log(this._connection);
}

module.exports = function(){
    return UsuarioDAO;
}