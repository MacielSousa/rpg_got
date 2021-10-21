const mongo = require('mongodb');

const connMongoDb = function() {
   console.log('Entrou na função de conexão');
   const db = new mongo.Db(
       'got',
        new mongo.Server(
            'localhost',//string contendo o endereço do servidor
            27017,//porta de conexão
            {}
        ),
        {}
    );
}

module.exports = function(){
   return connMongoDb;
}