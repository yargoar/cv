# Dockerfile para o frontend React do CV Fullstack
FROM node:18-alpine AS builder

# Argumentos de build
ARG VITE_ENV=production
ARG VITE_API_URL=http://localhost:3001
ARG VITE_APP_TITLE=CV Fullstack
ARG VITE_APP_PRIMARY_COLOR=#007bff
ARG VITE_APP_SECONDARY_COLOR=#6c757d
ARG VITE_APP_TEXT_COLOR=#212529
ARG VITE_APP_BACKGROUND_COLOR=#ffffff
ARG VITE_APP_FONT_TITLE_URL=
ARG VITE_APP_FONT_BODY_URL=
ARG VITE_APP_FONT_TITLE=Inter
ARG VITE_APP_FONT_BODY=Inter

# Definir variáveis de ambiente
ENV VITE_ENV=$VITE_ENV
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_APP_TITLE=$VITE_APP_TITLE
ENV VITE_APP_PRIMARY_COLOR=$VITE_APP_PRIMARY_COLOR
ENV VITE_APP_SECONDARY_COLOR=$VITE_APP_SECONDARY_COLOR
ENV VITE_APP_TEXT_COLOR=$VITE_APP_TEXT_COLOR
ENV VITE_APP_BACKGROUND_COLOR=$VITE_APP_BACKGROUND_COLOR
ENV VITE_APP_FONT_TITLE_URL=$VITE_APP_FONT_TITLE_URL
ENV VITE_APP_FONT_BODY_URL=$VITE_APP_FONT_BODY_URL
ENV VITE_APP_FONT_TITLE=$VITE_APP_FONT_TITLE
ENV VITE_APP_FONT_BODY=$VITE_APP_FONT_BODY

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Stage de produção com Nginx
FROM nginx:alpine

# Copiar arquivos buildados
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
