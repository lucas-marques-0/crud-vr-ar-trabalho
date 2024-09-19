const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
  static: path.join(__dirname, 'public') // Serve a pasta 'public'
});

// Middleware CORS (opcional, já configurado antes)
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
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
