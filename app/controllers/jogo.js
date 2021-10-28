module.exports.jogo = function(application, req, res){
    if(req.session.autorizado !== true){
        res.send('Usuário precisa fazer login');
        return;
    }

    var msg = '';
    if(req.query.msg != ''){
        msg = req.query.msg;
    }

    const usuario = req.session.usuario;
    const casa = req.session.casa;

    const connection = application.config.dbConnection;
    const JogoDAO = new application.app.models.JogoDAO(connection);

    JogoDAO.iniciaJogo(res, usuario, casa, msg);
    
}

module.exports.sair = function(application, req, res){
    req.session.destroy(function(err){
        res.render("index", {validacao: {}, dadosForm: {}});
    });
}

module.exports.suditos = function(application, req, res){

    if(req.session.autorizado !== true){
        res.render('index', {validacao: {}});
        return;
    }
    
    res.render("aldeoes", {validacao: {}});
}

module.exports.pergaminhos = function(application, req, res){
   
    if(req.session.autorizado !== true){
        res.render('index', {validacao: {}});
        return;
    }

    /* recuperar as ações inseridas no banco de dados */
    const connection = application.config.dbConnection;
    const JogoDAO = new application.app.models.JogoDAO(connection);
    const usuario = req.session.usuario;

    JogoDAO.getAcao(usuario, res);

}

module.exports.ordenar_acao_sudito = function(application, req, res){
    
    if(req.session.autorizado !== true){
        res.render('index', {validacao: {}});
        return;
    }

    const dadosForm = req.body;
    req.assert('acao', 'Ação deve ser informada').notEmpty();
    req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

    const erros = req.validationErrors();

    if(erros){
        res.redirect('jogo?msg=A');
        return;
    }


    const connection = application.config.dbConnection;
    const JogoDAO = new application.app.models.JogoDAO(connection);

    dadosForm.usuario = req.session.usuario;

    JogoDAO.acao(dadosForm);

    res.redirect('jogo?msg=B');

    
}

module.exports.revogar_acao = function(application, req, res){
    
    const url_query = req.query;

    const connection = application.config.dbConnection;
    const JogoDAO = new application.app.models.JogoDAO(connection);

    const _id = url_query.id_acao;

    JogoDAO.revogarAcao(_id, res);
}