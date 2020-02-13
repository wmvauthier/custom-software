# custom-software
Software em NodeJS que cadastra Registros Financeiros de Empresas e os compara entre si com gráficos, salvando os registros num banco MySQL

## Requisitos

1. NodeJS
2. MySQL
3. Yarn
4. Um Banco de Dados MySQL com o nome "sobmedida"

## Scripts

O Projeto conta com alguns Scripts que auxiliam no gerenciamento do Banco de Dados e nos Testes em si.

### create-table

Script que cria as Tabelas no Banco de Dados de produção

```bash
yarn create-table```

### initial-database

Script que instancia uma base de dados inicial aleatória

```bash
yarn initial-database```

### test

Script que executa os testes da Aplicação

```bash
yarn initial-database```

### start

Script que roda a Aplicação em modo de Produção

```bash
yarn start```

### dev

Script que roda a Aplicação em modo da Desenvolvimento com Nodemon

```bash
yarn dev```