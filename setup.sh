#!/bin/bash
echo "Iniciando configuração do ambiente..."

# Instalar dependências
echo "Instalando dependências..."
npm install

# Verificar se o arquivo .env existe, se não, criar um template
if [ ! -f .env ]; then
    echo "Criando arquivo .env..."
    cat > .env << EOL
DB_HOST=aws-0-us-east-2.pooler.supabase.com
DB_USER=postgres.tqvkwtwzerexdoyquejm
DB_PORT=5432
DB_PASSWORD=InteliBD12!
DB_DATABASE=postgres
DB_SSL=true
PORT=3000

EOL
    echo "Arquivo .env criado! Por favor, configure as variáveis de ambiente."
fi

# Inicializar o banco de dados
echo "Inicializando banco de dados..."
npm run init-db

# Iniciar o servidor em modo de desenvolvimento
echo "Iniciando servidor em modo de desenvolvimento..."
npm run dev