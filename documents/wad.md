# WAD
## Introdução

Este documento faz parte do repositório e apresenta uma visão geral do projeto, com foco na estrutura do banco de dados.

## Modelo de Banco de Dados

A imagem abaixo ilustra o modelo de banco de dados utilizado:
  
![Modelo do Banco](Modelo-Banco.png)




## to self -----------------------------------------------------------------------------------------------------

Configuração do Banco de Dados
------------------------------

1. **Criar banco de dados:**
    
    Crie um banco de dados PostgreSQL com o nome especificado no seu arquivo `.env`.
    
2. **Executar o script SQL de inicialização:**
    
```bash
npm run init-db
```
    
Isso criará a tabela `users` no seu banco de dados PostgreSQL com UUID como chave primária e inserirá alguns registros de exemplo.
    

Scripts Disponíveis
-------------------

* `npm start`: Inicia o servidor Node.js.
* `npm run dev`: Inicia o servidor com `nodemon`, reiniciando automaticamente após alterações no código.
* `npm run test`: Executa os testes automatizados.
* `npm run test:coverage`: Executa os testes e gera um relatório de cobertura de código.

