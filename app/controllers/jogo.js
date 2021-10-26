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
        res.render("index", {validacao: {}});
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
    res.render("pergaminhos", {validacao: {}});

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