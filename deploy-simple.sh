#!/bin/bash

# Script de Deploy Simples para Produção - CV Fullstack
# Autor: Yargo A Rocha
# Descrição: Deploy básico e seguro para produção

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configurações
PRODUCTION_ENV_FILE=".env.production"
COMPOSE_FILE="docker-compose.prod.simple.yml"

# Função para logging
log() {
    echo -e "${BLUE}[$(date '+%H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERRO]${NC} $1"
    exit 1
}

success() {
    echo -e "${GREEN}[OK]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[AVISO]${NC} $1"
}

# Função para verificar pré-requisitos
check_prerequisites() {
    log "Verificando pré-requisitos..."
    
    # Verificar se Docker está rodando
    if ! docker info &> /dev/null; then
        error "Docker não está rodando"
    fi
    
    # Verificar se docker compose está disponível
    if ! docker compose version &> /dev/null; then
        error "Docker Compose não encontrado"
    fi
    
    # Verificar se arquivo de ambiente existe
    if [ ! -f "$PRODUCTION_ENV_FILE" ]; then
        error "Arquivo $PRODUCTION_ENV_FILE não encontrado"
    fi
    
    # Verificar se senhas foram alteradas
    if grep -q "ALTERE_ESTA_SENHA_FORTE" "$PRODUCTION_ENV_FILE"; then
        error "Configure a senha do MongoDB no arquivo $PRODUCTION_ENV_FILE"
    fi
    
    if grep -q "yourdomain.com" "$PRODUCTION_ENV_FILE"; then
        warning "Configure seu domínio no arquivo $PRODUCTION_ENV_FILE"
    fi
    
    success "Pré-requisitos verificados"
}

# Função para backup simples do banco
backup_database() {
    log "Fazendo backup do banco de dados..."
    
    BACKUP_NAME="backup_$(date +%Y%m%d_%H%M%S)"
    BACKUP_DIR="./backups"
    
    # Criar diretório de backup
    mkdir -p "$BACKUP_DIR"
    
    # Backup do MongoDB
    if docker compose --env-file "$PRODUCTION_ENV_FILE" exec -T mongo_db mongodump \
        --username admin \
        --password "$(grep MONGODB_ROOT_PASSWORD "$PRODUCTION_ENV_FILE" | cut -d'=' -f2)" \
        --authenticationDatabase admin \
        --db cv_db_prod \
        --out "/tmp/$BACKUP_NAME" 2>/dev/null; then
        
        # Copiar backup para host
        docker compose --env-file "$PRODUCTION_ENV_FILE" cp "mongo_db:/tmp/$BACKUP_NAME" "$BACKUP_DIR/"
        
        success "Backup criado em: $BACKUP_DIR/$BACKUP_NAME"
    else
        warning "Não foi possível fazer backup (primeiro deploy?)"
    fi
}

# Função para build das imagens
build_images() {
    log "Construindo imagens Docker..."
    
    if docker compose --env-file "$PRODUCTION_ENV_FILE" -f "$COMPOSE_FILE" build --no-cache; then
        success "Imagens construídas com sucesso"
    else
        error "Falha ao construir imagens"
    fi
}

# Função para deploy
deploy() {
    log "Iniciando deploy..."
    
    # Parar containers existentes
    log "Parando containers existentes..."
    docker compose --env-file "$PRODUCTION_ENV_FILE" -f "$COMPOSE_FILE" down
    
    # Iniciar novos containers
    log "Iniciando novos containers..."
    if docker compose --env-file "$PRODUCTION_ENV_FILE" -f "$COMPOSE_FILE" up -d; then
        success "Containers iniciados com sucesso"
    else
        error "Falha ao iniciar containers"
    fi
    
    # Aguardar containers ficarem saudáveis
    log "Aguardando containers ficarem saudáveis..."
    sleep 30
}

# Função para testes básicos
test_deployment() {
    log "Testando deploy..."
    
    # Testar API
    if curl -f -s http://localhost:3001/api/pt > /dev/null; then
        success "API respondendo"
    else
        error "API não está respondendo"
    fi
    
    # Testar Frontend
    if curl -f -s http://localhost/ > /dev/null; then
        success "Frontend respondendo"
    else
        error "Frontend não está respondendo"
    fi
    
    success "Deploy testado com sucesso"
}

# Função para limpeza
cleanup() {
    log "Limpando recursos não utilizados..."
    docker image prune -f
    docker volume prune -f
    success "Limpeza concluída"
}

# Função para mostrar status
show_status() {
    log "Status dos containers:"
    docker compose --env-file "$PRODUCTION_ENV_FILE" -f "$COMPOSE_FILE" ps
    
    echo ""
    log "Uso de recursos:"
    docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}"
}

# Função para mostrar logs
show_logs() {
    docker compose --env-file "$PRODUCTION_ENV_FILE" -f "$COMPOSE_FILE" logs -f
}

# Função principal
main() {
    case "$1" in
        deploy)
            log "Iniciando deploy simples para produção"
            check_prerequisites
            backup_database
            build_images
            deploy
            test_deployment
            cleanup
            success "Deploy concluído!"
            echo ""
            echo -e "${GREEN}Acessos:${NC}"
            echo "  Frontend: http://localhost/"
            echo "  API: http://localhost:3001/api/pt"
            echo ""
            ;;
        status)
            show_status
            ;;
        logs)
            show_logs
            ;;
        stop)
            log "Parando containers..."
            docker compose --env-file "$PRODUCTION_ENV_FILE" -f "$COMPOSE_FILE" down
            success "Containers parados"
            ;;
        restart)
            log "Reiniciando containers..."
            docker compose --env-file "$PRODUCTION_ENV_FILE" -f "$COMPOSE_FILE" restart
            success "Containers reiniciados"
            ;;
        backup)
            backup_database
            ;;
        test)
            test_deployment
            ;;
        *)
            echo -e "${BLUE}CV Fullstack - Deploy Simples para Produção${NC}"
            echo ""
            echo "Uso: $0 [COMANDO]"
            echo ""
            echo "Comandos disponíveis:"
            echo "  ${GREEN}deploy${NC}   - Deploy completo para produção"
            echo "  ${GREEN}status${NC}   - Mostrar status dos containers"
            echo "  ${GREEN}logs${NC}     - Mostrar logs em tempo real"
            echo "  ${GREEN}stop${NC}     - Parar containers"
            echo "  ${GREEN}restart${NC}  - Reiniciar containers"
            echo "  ${GREEN}backup${NC}   - Fazer backup do banco"
            echo "  ${GREEN}test${NC}     - Testar deploy"
            echo ""
            echo "Exemplos:"
            echo "  $0 deploy"
            echo "  $0 status"
            echo "  $0 logs"
            exit 1
            ;;
    esac
}

# Executar função principal
main "$@"
