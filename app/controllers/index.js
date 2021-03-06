module.exports.home = function(application, req, res){
    res.render('index', {validacao: {}, dadosForm: {}});
}
module.exports.autenticar = function(application, req, res){
    const dadosFomr = req.body;

    req.assert('usuario', 'Usuário não deve ser vazio').notEmpty();
    req.assert('senha', 'Senha não deve ser vazia').notEmpty();

    const erros = req.validationErrors();
    if(erros){
        res.render('index', {validacao:erros});
        return;
    }

    const connection = application.config.dbConnection;
    const UsuariosDAO = new application.app.models.UsuarioDAO(connection);

    UsuariosDAO.autenticar(dadosFomr, req, res);

}