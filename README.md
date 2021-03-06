# ProntoMed

Aplicação desenvolvida para fins de avaliação da banca do processo seletivo da PEBMED.

## Considerações

Mesmo tendo a opção de utilizar PHP/Laravel, optei por Node.JS, mesmo não estando muito familiarizado com ela.

Sobre o Docker: não consegui rodar a aplicação através de um container Docker, não pelo fato de eu nunca ter utilizado o mesmo, mas pelo motivo de que meu notebook aparentemente não é compatível, é necessário habilitar na BIOS a virtualização, no entanto, mesmo após a atualização do Firmware da BIOS essa opção não ficou disponível, sempre que tento instalar o Docker fico preso na seguinte mensagem: Hardware assisted virtualization and data execution protection must be enabled in the BIOS.

# Instância AWS

Lembrando que o IP Público não é fixo, uma vez que estou utilizando uma máquina EC2 do free tier:

- DNS IPv4 Público: **ec2-3-21-44-33.us-east-2.compute.amazonaws.com:8000**
- IPv4 Público (Atual): **3.21.44.33:8000**


## Checklist 

- [x] NodeJS
- [x] REST
- [x] Validação de Dados
- [x] JWT Token
- [x] Testes Unitários
- [x] Diagrama ER
- [x] MySQL
- [x] Postman
- [x] Deploy AWS
- [x] Lint
- [ ] Docker

## Setup

- Realizar uma cópia do arquivo `.env.example` e nomear como `.env`

- Configurar a variável `JWT_SECRET` no arquivo `.env`

- Configurar a conexão com o banco de dados no arquivo `.env`, alterando os valores das seguintes variáveis: `TYPEORM_HOST`, `TYPEORM_PORT`, `TYPEORM_USERNAME`, `TYPEORM_PASSWORD`, `TYPEORM_DATABASE`;

- Conectar ao MySQL e criar um banco de dados com o nome escolhido em `TYPEORM_DATABASE`, exemplo: `CREATE DATABASE TYPEORM_DATABASE`

- Criar schema de dados com o comando: `npm run typeorm migration:run`

- Popular a base com o comando: `npm run seeding -- seed`. Após isso, será criado na base um médico padrão com os seguintes dados: `{ email:"medico@prontomed.com", senha:123456 }`

## Jest

- Execução de testes: `npm run test`

## Executar Aplicação

- Deploy da aplicação: `npm run start`

## Postman (Documentação API)

A aplicação foi dividida em 4 "módulos" (controllers), é possível importar as Collections a partir dos seguintes links:

- [Autenticação](https://app.getpostman.com/run-collection/028226daa69df86ca430#?env%5BDevelopment%5D=W3sia2V5IjoiU0VSVkVSX1BPUlQiLCJ2YWx1ZSI6IjgwMDAiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6IlNFUlZFUl9BRERSRVNTIiwidmFsdWUiOiJsb2NhbGhvc3QiLCJlbmFibGVkIjp0cnVlfV0=) (Login, Logout - JWT Tokens)

- [Pacientes](https://app.getpostman.com/run-collection/e48409bcc452ad1eb9c7#?env%5BDevelopment%5D=W3sia2V5IjoiU0VSVkVSX1BPUlQiLCJ2YWx1ZSI6IjgwMDAiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6IlNFUlZFUl9BRERSRVNTIiwidmFsdWUiOiJsb2NhbGhvc3QiLCJlbmFibGVkIjp0cnVlfV0=) (Listar, Criar, Atualizar, Detalhar, Excluir)

- [Agendamentos](https://app.getpostman.com/run-collection/e741d4d2cfb56c07faab#?env%5BDevelopment%5D=W3sia2V5IjoiU0VSVkVSX1BPUlQiLCJ2YWx1ZSI6IjgwMDAiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6IlNFUlZFUl9BRERSRVNTIiwidmFsdWUiOiJsb2NhbGhvc3QiLCJlbmFibGVkIjp0cnVlfV0=) (Listar, Criar, Atualizar, Detalhar, Excluir)

- [Consultas](https://app.getpostman.com/run-collection/b7983df610294e2be1b6#?env%5BDevelopment%5D=W3sia2V5IjoiU0VSVkVSX1BPUlQiLCJ2YWx1ZSI6IjgwMDAiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6IlNFUlZFUl9BRERSRVNTIiwidmFsdWUiOiJsb2NhbGhvc3QiLCJlbmFibGVkIjp0cnVlfV0=) (Iniciar, Detalhes, Adicionar Observação, Adicionar Anotação)

## Diagrama ER

![Diagrama ER - ProntoMed](https://user-images.githubusercontent.com/7808139/110196394-f4718400-7e22-11eb-83cd-5793edaa7bee.png)

## Resultados Jest

![Resultados Teste - ProntoMed](https://user-images.githubusercontent.com/7808139/110196390-f3405700-7e22-11eb-8da3-379fed3022a2.png)

## Resultados TSLint

![TSLint - ProntoMed](https://user-images.githubusercontent.com/7808139/110196392-f3d8ed80-7e22-11eb-8168-969fa7087b89.png)
