# db/Dockerfile
FROM mongo:6

# Criar diretório se não existir
RUN mkdir -p /docker-entrypoint-initdb.d

# Copiar script de inicialização
COPY init-db/init.js /docker-entrypoint-initdb.d/

# Garantir permissões
RUN chmod a+r /docker-entrypoint-initdb.d/init.js


#---------------------

# db/Dockerfile
#FROM mongo:latest

# Copiar scripts de inicialização
#COPY init-db /docker-entrypoint-initdb.d

# Definir permissões (opcional, para garantir que o script seja executável)
#RUN chmod +x /docker-entrypoint-initdb.d/init.js
