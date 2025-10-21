#!/bin/bash

# Script para iniciar o CV Fullstack com arquivo .env
# Autor: Sistema CV Fullstack
# Descrição: Inicia o sistema usando o arquivo .env

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para exibir status
show_status() {
    echo -e "${BLUE}CV Fullstack System Status:${NC}"
    echo ""
    echo -e "${GREEN}Acessos disponíveis:${NC}"
    echo "  Frontend React: http://localhost:3000"
    echo "  Backend API: http://localhost:3001"
    echo "  MongoDB: localhost:27017"
    echo ""
    echo -e "${YELLOW}APIs do currículo:${NC}"
    echo "  Português: http://localhost:3000/api/pt"
    echo "  Inglês: http://localhost:3000/api/en"
    echo "  Francês: http://localhost:3000/api/fr"
    echo ""
}

# Verificar se o arquivo .env existe
if [ ! -f ".env" ]; then
    echo -e "${RED}Arquivo .env não encontrado!${NC}"
    exit 1
fi

# Verificar se Docker está rodando
if ! docker info &> /dev/null; then
    echo -e "${RED}Docker não está rodando. Inicie o Docker primeiro.${NC}"
    exit 1
fi

# Verificar se docker compose está disponível
if ! docker compose version &> /dev/null; then
    echo -e "${RED}docker compose não encontrado. Instale o Docker Compose primeiro.${NC}"
    exit 1
fi

# Parar containers existentes
echo -e "${YELLOW}Parando containers existentes...${NC}"
docker compose --env-file .env down

# Construir e iniciar containers
echo -e "${BLUE}Construindo e iniciando CV Fullstack System...${NC}"
docker compose --env-file .env up -d --build

# Aguardar containers iniciarem
echo -e "${YELLOW}Aguardando containers iniciarem...${NC}"
sleep 10

# Verificar status dos containers
echo -e "${BLUE}Verificando status dos containers:${NC}"
docker compose --env-file .env ps

# Testar APIs
echo -e "${BLUE}Testando APIs...${NC}"
echo "Testando API em francês..."
curl -s http://localhost:3000/api/fr | head -c 50 && echo "..."
echo "Testando API em português..."
curl -s http://localhost:3000/api/pt | head -c 50 && echo "..."

echo ""
echo -e "${GREEN}Sistema iniciado com sucesso!${NC}"
show_status
