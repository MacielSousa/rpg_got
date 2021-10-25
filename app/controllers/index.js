module.exports.home = function(application, req, res){
    res.render('index');
}
module.exports.autenticar = function(application, req, res){
    const dadosFomr = req.body;

    req.assert('usuario', 'Usuários deve ser vazio').notEmpty();
    req.assert('senha', 'Senha não deve ser vazia').notEmpty();

    const erros = req.validationErrors();

    if(erros){
        res.render('index', {validacao:erros});
        return;
    }

    res.send('tuso ok para criar a sessão!');
}