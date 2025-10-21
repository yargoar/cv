# CV Fullstack - Deploy Simples para Produção

## Configuração Básica e Segura

Este guia mostra como fazer deploy do projeto CV Fullstack para produção de forma simples e segura, sem complexidades desnecessárias.

## Pré-requisitos

- Docker e Docker Compose instalados
- Domínio configurado (opcional)
- Certificado SSL (opcional, mas recomendado)

## Configuração Rápida

### 1. Preparar Ambiente

```bash
# Copiar configuração de produção
cp env-production-simple .env.production

# Editar configurações
nano .env.production
```

### 2. Configurar Variáveis

Edite o arquivo `.env.production` com suas configurações:

```env
# Senha forte para o MongoDB
MONGODB_ROOT_PASSWORD=SUA_SENHA_FORTE_AQUI

# Seu domínio (opcional)
DOMAIN_NAME=seu-dominio.com
VITE_API_URL=https://seu-dominio.com/api/
```

### 3. Deploy

```bash
# Deploy completo
./deploy-simple.sh deploy

# Verificar status
./deploy-simple.sh status

# Ver logs
./deploy-simple.sh logs
```

## Comandos Disponíveis

```bash
./deploy-simple.sh deploy    # Deploy completo
./deploy-simple.sh status    # Status dos containers
./deploy-simple.sh logs      # Logs em tempo real
./deploy-simple.sh stop      # Parar containers
./deploy-simple.sh restart   # Reiniciar containers
./deploy-simple.sh backup    # Backup do banco
./deploy-simple.sh test      # Testar deploy
```

## Estrutura Simplificada

### Containers
- **Frontend**: React + Nginx (porta 80/443)
- **Backend**: Node.js API (porta 3001)
- **Database**: MongoDB (porta 27017)

### Segurança Básica
- Senhas fortes obrigatórias
- Containers com restart automático
- Health checks básicos
- Isolamento de rede

## SSL/HTTPS (Opcional)

Para habilitar HTTPS:

### 1. Certificados Let's Encrypt

```bash
# Instalar certbot
sudo apt install certbot

# Gerar certificado
sudo certbot certonly --standalone -d seu-dominio.com

# Copiar certificados
sudo cp /etc/letsencrypt/live/seu-dominio.com/fullchain.pem ./ssl/cert.pem
sudo cp /etc/letsencrypt/live/seu-dominio.com/privkey.pem ./ssl/key.pem
sudo chown $USER:$USER ./ssl/*
```

### 2. Configurar Nginx

Criar arquivo `cv-fullstack/front-react/nginx.ssl.conf`:

```nginx
server {
    listen 80;
    server_name seu-dominio.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name seu-dominio.com;
    
    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    
    root /usr/share/nginx/html;
    index index.html;
    
    # Configuração para SPA
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Proxy para API
    location /api/ {
        proxy_pass http://node_api:3001/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Segurança
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
}
```

## Backup e Restore

### Backup Automático
```bash
# Backup manual
./deploy-simple.sh backup

# Backup será salvo em ./backups/
```

### Restore
```bash
# Parar containers
./deploy-simple.sh stop

# Restaurar backup
docker compose --env-file .env.production -f docker-compose.prod.simple.yml exec mongo_db \
  mongorestore --username admin --password SUA_SENHA --authenticationDatabase admin \
  --db cv_db_prod /backups/backup_YYYYMMDD_HHMMSS

# Reiniciar containers
./deploy-simple.sh restart
```

## Monitoramento Básico

### Verificar Status
```bash
# Status dos containers
./deploy-simple.sh status

# Logs em tempo real
./deploy-simple.sh logs

# Testar APIs
curl http://localhost:3001/api/pt
curl http://localhost/
```

### Logs
```bash
# Logs do frontend
docker logs yargoar_frontend_react_prod

# Logs da API
docker logs yargoar_node_api_prod

# Logs do MongoDB
docker logs yargoar_mongodb_prod
```

## Troubleshooting

### Container não inicia
```bash
# Ver logs do container
docker logs NOME_DO_CONTAINER

# Verificar configuração
docker compose --env-file .env.production -f docker-compose.prod.simple.yml config
```

### API não responde
```bash
# Testar conexão direta
curl http://localhost:3001/api/pt

# Verificar logs da API
docker logs yargoar_node_api_prod

# Verificar saúde do MongoDB
docker exec yargoar_mongodb_prod mongosh --eval "db.adminCommand('ping')"
```

### Frontend não carrega
```bash
# Verificar logs do Nginx
docker logs yargoar_frontend_react_prod

# Testar arquivos estáticos
curl http://localhost/

# Verificar configuração do proxy
docker exec yargoar_frontend_react_prod cat /etc/nginx/conf.d/default.conf
```

## Manutenção

### Atualizar Código
```bash
# Fazer backup
./deploy-simple.sh backup

# Deploy com novo código
./deploy-simple.sh deploy
```

### Limpeza
```bash
# Limpar imagens não utilizadas
docker image prune -f

# Limpar volumes não utilizados
docker volume prune -f

# Limpar containers parados
docker container prune -f
```

## Checklist de Produção

### Antes do Deploy
- [ ] Senha forte configurada
- [ ] Domínio configurado (se aplicável)
- [ ] Certificado SSL (se aplicável)
- [ ] Backup do ambiente anterior

### Após o Deploy
- [ ] Containers rodando
- [ ] API respondendo
- [ ] Frontend carregando
- [ ] Backup funcionando

### Monitoramento Contínuo
- [ ] Verificar logs regularmente
- [ ] Backup diário funcionando
- [ ] Performance aceitável
- [ ] SSL válido (se aplicável)

## Vantagens desta Abordagem

- **Simples**: Sem complexidades desnecessárias
- **Segura**: Configurações básicas de segurança
- **Maintível**: Fácil de gerenciar e atualizar
- **Eficiente**: Recursos otimizados
- **Confiável**: Deploy e backup automatizados

Esta configuração é ideal para projetos pequenos a médios que precisam de uma solução robusta mas sem complexidade excessiva.
