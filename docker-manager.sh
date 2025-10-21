#!/bin/bash

# Script de gerenciamento Docker para CV Fullstack
# Autor: Sistema CV Fullstack
# Descrição: Facilita o gerenciamento dos containers Docker

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para exibir ajuda
show_help() {
    echo -e "${BLUE}CV Fullstack Docker Manager${NC}"
    echo ""
    echo "Uso: $0 [COMANDO]"
    echo ""
    echo "Comandos disponíveis:"
    echo "  ${GREEN}start${NC}     - Inicia todos os serviços"
    echo "  ${GREEN}stop${NC}      - Para todos os serviços"
    echo "  ${GREEN}restart${NC}   - Reinicia todos os serviços"
    echo "  ${GREEN}build${NC}     - Constrói as imagens Docker"
    echo "  ${GREEN}logs${NC}      - Exibe logs de todos os serviços"
    echo "  ${GREEN}status${NC}    - Exibe status dos containers"
    echo "  ${GREEN}clean${NC}     - Remove containers e volumes"
    echo "  ${GREEN}shell${NC}     - Acessa shell do backend"
    echo "  ${GREEN}mongo${NC}     - Acessa shell do MongoDB"
    echo "  ${GREEN}help${NC}      - Exibe esta ajuda"
    echo ""
    echo "Exemplos:"
    echo "  $0 start"
    echo "  $0 logs node_api"
    echo "  $0 shell"
}

# Função para iniciar serviços
start_services() {
    echo -e "${BLUE}Iniciando CV Fullstack System...${NC}"
    docker compose up -d
    echo -e "${GREEN}Servicos iniciados com sucesso!${NC}"
    echo ""
    echo -e "${YELLOW}Acessos disponiveis:${NC}"
    echo "  Frontend React: http://localhost:3000"
    echo "  Backend API: http://localhost:3001"
    echo "  MongoDB: localhost:27017"
    echo ""
    echo -e "${BLUE}Para ver logs: $0 logs${NC}"
}

# Função para parar serviços
stop_services() {
    echo -e "${YELLOW}Parando CV Fullstack System...${NC}"
    docker compose down
    echo -e "${GREEN}Servicos parados com sucesso!${NC}"
}

# Função para reiniciar serviços
restart_services() {
    echo -e "${YELLOW}Reiniciando CV Fullstack System...${NC}"
    docker compose down
    docker compose up -d
    echo -e "${GREEN}Servicos reiniciados com sucesso!${NC}"
}

# Função para construir imagens
build_images() {
    echo -e "${BLUE}Construindo imagens Docker...${NC}"
    docker compose build --no-cache
    echo -e "${GREEN}Imagens construidas com sucesso!${NC}"
}

# Função para exibir logs
show_logs() {
    if [ -n "$2" ]; then
        echo -e "${BLUE}Logs do servico $2:${NC}"
        docker compose logs -f "$2"
    else
        echo -e "${BLUE}Logs de todos os servicos:${NC}"
        docker compose logs -f
    fi
}

# Função para exibir status
show_status() {
    echo -e "${BLUE}Status dos containers:${NC}"
    docker compose ps
    echo ""
    echo -e "${BLUE}Status dos volumes:${NC}"
    docker volume ls | grep yargoar
}

# Função para limpeza
clean_system() {
    echo -e "${RED}Removendo containers e volumes...${NC}"
    read -p "Tem certeza que deseja remover todos os dados? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker compose down -v
        docker system prune -f
        echo -e "${GREEN}Limpeza concluida!${NC}"
    else
        echo -e "${YELLOW}Operacao cancelada.${NC}"
    fi
}

# Função para acessar shell do backend
access_backend_shell() {
    echo -e "${BLUE}Acessando shell do backend...${NC}"
    docker compose exec node_api sh
}

# Função para acessar MongoDB
access_mongo() {
    echo -e "${BLUE}Acessando MongoDB...${NC}"
    docker compose exec mongo_db mongosh -u root -p yargoar_password --authenticationDatabase admin
}

# Verificar se Docker está rodando
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        echo -e "${RED}ERRO: Docker nao esta rodando. Inicie o Docker primeiro.${NC}"
        exit 1
    fi
}

# Verificar se docker compose está disponível
check_docker_compose() {
    if ! docker compose version &> /dev/null; then
        echo -e "${RED}ERRO: docker compose nao encontrado. Instale o Docker Compose primeiro.${NC}"
        exit 1
    fi
}

# Main
main() {
    check_docker
    check_docker_compose
    
    case "${1:-help}" in
        start)
            start_services
            ;;
        stop)
            stop_services
            ;;
        restart)
            restart_services
            ;;
        build)
            build_images
            ;;
        logs)
            show_logs "$@"
            ;;
        status)
            show_status
            ;;
        clean)
            clean_system
            ;;
        shell)
            access_backend_shell
            ;;
        mongo)
            access_mongo
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            echo -e "${RED}ERRO: Comando invalido: $1${NC}"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

# Executar função principal
main "$@"