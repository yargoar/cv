// db/init-db/init.js
const fs = require('fs');

// Conexão segura com tratamento de erros
try {
    // Autenticação
    db = db.getSiblingDB('admin');
    db.auth(
        process.env.MONGO_INITDB_ROOT_USERNAME, 
        process.env.MONGO_INITDB_ROOT_PASSWORD
    );
    
    const dbName = process.env.MONGO_INITDB_DATABASE || 'yargo';
    const targetDB = db.getSiblingDB(dbName);
    
try {
    // 1. Criação do usuário da aplicação
    targetDB.createUser({
        user: 'user_api',
        pwd: `${process.env.MONGO_INITDB_ROOT_PASSWORD}-api`,
        roles: [{ role: 'readWrite', db: dbName }]
    });
} catch (e){
	print('user_api already exists');
}
    
    // 2. Carga de dados iniciais (versão resiliente)
    const languages = process.env.LANGUAGES ? process.env.LANGUAGES.split(',') : ['en']; // Idiomas fixos ou use process.env
    
    languages.forEach(lang => {
        try {
            const data = JSON.parse(
                fs.readFileSync(`/docker-entrypoint-initdb.d/${lang}.json`, 'utf8')
            );
            targetDB.profiles.insertOne({ 
                ...data,
                lang: lang,
                createdAt: new Date() 
            });
            print(`Dados carregados para ${lang}`);
        } catch (e) {
            print(`Erro ao carregar ${lang}: ${e.message}`);
        }
    });
    
    print('Banco inicializado com sucesso!');
} catch (e) {
    print('ERRO CRÍTICO: ' + e.message);
    // Força saída com erro
    quit(1);
}
