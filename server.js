const jsonServer = require('json-server');
const bodyParser = require('body-parser');  // Adicionando body-parser
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router('db.json');  // Substitua pelo seu arquivo JSON
const middlewares = jsonServer.defaults({
  static: path.join(__dirname, 'public') // Serve a pasta 'public'
});

// Middleware CORS (opcional)
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Adicionando o body-parser para processar o req.body
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Middleware para garantir que IDs sejam numéricos e sequenciais
server.use((req, res, next) => {
  if (req.method === 'POST') {
    const db = router.db; // Acesso ao banco de dados
    const users = db.get('users').value(); // Obtenha a lista de usuários
    const maxId = Math.max(...users.map(user => parseInt(user.id, 10)).filter(id => !isNaN(id))); // Acha o maior ID numérico
    req.body.id = maxId + 1; // Gera o próximo ID numérico
  }
  next();
});

// Usar middlewares padrões e a pasta 'public'
server.use(middlewares);

// Rotas da API (JSON Server)
server.use(router);

// Iniciar servidor na porta 4000
server.listen(4000, () => {
  console.log('JSON Server está rodando na porta 4000');
});
