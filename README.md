# bovcontrol-teste

## Rodar o programa

Para rodar o programa precisa ter o node instalado e de preferencia o Docker

Primeiro iniciamos o mongo com o comando

```shell
  docker-compose up
```

e para rodar a API

```shell
  yarn
  yarn start
```

Caso o mongo usado seja o do docker compose as variaveis de ambiente ja estao setadas no arquivo .env, mas caso queira usar o mongo em outro lugar deve-se mudar os valores das variaveis do arquivo.

## Teste da API

Para Testar a API acesse o link do [postman](https://app.getpostman.com/join-team?invite_code=81e84bd239069483e1acce07d3839fd4&target_code=8b13ec8637380fd104d470fe27435473)

La tem todas as rotas Configuradas