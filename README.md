# 💸 API de Transações

API RESTful desenvolvida com NestJS que recebe transações financeiras e retorna estatísticas baseadas nas transações ocorridas nos últimos 60 segundos.

## 📋 Sumário

- [🧠 Visão Geral](#-visão-geral)
- [🚀 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [⚙️ Como Executar](#️-como-executar)
  - [Localmente](#localmente)
  - [Com Docker](#com-docker)
- [🧪 Testes](#-testes)
- [📊 Documentação Swagger](#-documentação-swagger)
- [🛡️ Segurança e Boas Práticas](#️-segurança-e-boas-práticas)
- [📈 Diferenciais Implementados](#-diferenciais-implementados)
- [📌 Endpoints da API](#-endpoints-da-api)
- [📄 Licença](#-licença)

## 🧠 Visão Geral

Esta API foi desenvolvida como parte de um desafio técnico para a posição de Desenvolvedor Pleno. Ela permite o registro de transações financeiras e fornece estatísticas em tempo real das transações realizadas nos últimos 60 segundos.

## 🚀 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/) com TypeScript
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- [Swagger](https://swagger.io/) para documentação da API
- [Jest](https://jestjs.io/) para testes unitários e de integração
- [Winston](https://github.com/winstonjs/winston) para logs estruturados
- [Helmet](https://helmetjs.github.io/) para segurança HTTP
- [Rate Limiting](https://github.com/nfriedly/express-rate-limit) para controle de requisições
- [Yarn](https://yarnpkg.com/) como gerenciador de pacotes

## ⚙️ Como Executar

### Localmente

```bash
git clone https://github.com/Icaro-AS/api-transactions.git
cd api-transactions
yarn install
yarn start:dev
```

### Com Docker

```bash
docker-compose up --build
```

A API estará disponível em `http://localhost:3000`.

## 🧪 Testes

```bash
yarn test
```

Cobertura:

```bash
yarn test:cov
```

## 📊 Documentação Swagger

Acesse:

```
http://localhost:3000/api
```

## 🛡️ Segurança e Boas Práticas

- Validação rigorosa com `class-validator`
- `Helmet.js` para proteção HTTP
- Rate limiting implementado
- Logs estruturados com Winston

## 📈 Diferenciais Implementados

- Clean Architecture
- Testes unitários e de integração
- Containerização com Docker
- Documentação Swagger
- Logs estruturados
- Healthcheck em `/health`
- Métricas para prometheus em `/metrics`

## 📌 Endpoints da API

### `POST /transactions`

Cria uma nova transação.

**Body**:

```json
{
  "amount": 100.5,
  "timestamp": "2025-05-14T03:36:25.000Z"
}
```

**Respostas**:

- `201 Created`: Transação registrada
- `400 Bad Request`: JSON inválido
- `422 Unprocessable Entity`: Regras de negócio violadas

---

### `GET /statistics`

Retorna estatísticas das transações dos últimos 60 segundos.

**Resposta**:

```json
{
  "count": 3,
  "sum": 300.0,
  "avg": 100.0,
  "min": 90.0,
  "max": 110.0
}
```

---

### `DELETE /transactions`

Remove todas as transações em memória.

**Resposta**:

- `200 OK`: Transações removidas

---

### `GET /health`

Verifica a saúde da API.

**Resposta**:

```json
{ "status": "ok" }
```

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
