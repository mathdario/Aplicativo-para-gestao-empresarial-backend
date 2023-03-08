# Desafio Módulo 5 - Backend

## 📇 Índice

1. [Cadastrar Usuário](#cadastrar-usuario)
2. [Verificar Email](#verificar-email)
3. [Enviar email para mudança de senha](#enviar-email)
4. [Mudar a senha](#mudar-senha)
5. [Fazer Login](#post-login)
6. [Obter Resumo de Cobranças e Clientes](#get-resumo)
7. [Detalhar Perfil do Usuário Logado](#detalhar-usuario)
8. [Editar Perfil do Usuário Logado](#editar-usuario)
9. [Listar Clientes](#listar-clientes)
10. [Cadastrar Cliente](#cadastrar-cliente)
11. [Detalhar Cliente](#detalhar-cliente)
12. [Editar Cliente](#editar-cliente)
13. [Listar Cobranças](#listar-cobrancas)
14. [Cadastrar Cobrança](#cadastrar-cobranca)
15. [Detalhar Cobrança](#detalhar-cobranca)
16. [Editar Cobrança](#editar-cobranca)
17. [Excluir Cobrança](#excluir-cobranca)

<br/>

## 📋 Descrição do Projeto

<br/>

Projeto desenvolvido para a parte de backend do curso de desenvolvimento de software. O projeto é um sistema de administração empresarial para gerir clientes e suas respectivas cobranças.

O sistema permitirá que o funcionário faça a administração das dívidas de qualquer cliente, podendo ver se o cliente está com pagamentos em dia, pendentes ou vencidos, podendo ser feito qualquer tipo de alteração, como editar usuário logado, cadastrar cliente, editar cliente, cadastrar cobrança, editar cobrança, excluir cobrança, entre outras funções, como descritas abaixo.

**Para acessar o link do deploy, [clique aqui](https://orca-app-52arz.ondigitalocean.app/).**

<br/>

## 🛠️ Funcionalidades do projeto

<br/>

<a id="cadastrar-usuario"></a>

### 1. Cadastrar usuário

#### `POST` `/usuario`

Essa é a rota que será utilizada para cadastrar um novo usuário no sistema.

- **Requisição**  
   Sem parâmetros de rota ou de query.  
   O corpo (body) deve possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - name
  - email
  - password

  <br>

- **Resposta**  
   Em caso de **sucesso**, serão enviados, no corpo (body) da resposta, o nome e email do usuário cadastrado, com o status 201. Também será enviado um e-mail de boas-vindas ao usuário cadastrado.<br>
  Em caso de **falha no cadastro**, a resposta possuirá um **_status code_** apropriado, e em seu corpo (body) haverá um objeto com uma propriedade **mensagem**, explicando o motivo da falha.

#### Exemplo de requisição

```javascript
// POST /usuario
{
  "name": "José",
  "email": "jose@email.com",
  "password": "123456"
}
```

#### Exemplos de resposta

```javascript
// HTTP Status 201
{
  "name": "José",
  "email": "jose@email.com"
}
```

```javascript
// HTTP Status 400
{
  "mensagem": "Email já cadastrado."
}
```

---

<a id="verificar-email"></a>

### 2. Verificar email

#### `GET` `/usuario/verificar-email`

Essa é a rota que será utilizada para verificar se o email do usuário já está cadastrado.

- **Requisição**<br>
  Parâmetro obrigatório do tipo query 'email'.  
   Sem parâmetros de rota.  
   Não deverá possuir conteúdo no corpo (body) da requisição.

- **Resposta**  
   Em caso de **sucesso**, não será enviado conteúdo no corpo (body) da resposta, status 204.  
   Em caso de **falha na requisição**, a resposta possuirá um **_status code_** apropriado, e em seu corpo (body) haverá um objeto com uma propriedade **mensagem**, explicando o motivo da falha.

#### Exemplo de requisição

```javascript
// GET /usuario/verificar-email?jose%40email.com
// Sem conteúdo no corpo (body) da requisição
```

#### Exemplos de resposta

```javascript
// HTTP Status 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400
{
  "mensagem": "Email já cadastrado."
}
```

---

<a id="enviar-email"></a>

### 3. Enviar email para mudança de senha

#### `GET` `/usuario/resetar-senha`

Essa é a rota que será utilizada para possibilitar ao usuário a mundaça de senha mediante a um e-mail enviado, com token válido por 5 minutos.

- **Requisição**<br>
  Parâmetro obrigatório do tipo query 'email'.  
   Sem parâmetros de rota.  
   Não deverá possuir conteúdo no corpo (body) da requisição.

- **Resposta**  
   Em caso de **sucesso**, não será enviado conteúdo no corpo (body) da resposta, status 204, e um e-mail será enviado ao usuário.  
   Em caso de **falha na requisição**, a resposta possuirá um **_status code_** apropriado, e em seu corpo (body) haverá um objeto com uma propriedade **mensagem**, explicando o motivo da falha.

#### Exemplo de requisição

```javascript
// GET /usuario/resetar-senha?jose%40email.com
// Sem conteúdo no corpo (body) da requisição
```

#### Exemplos de resposta

```javascript
// HTTP Status 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 404
{
  "mensagem": "Usuário não encontrado."
}
```

---

<a id="mudar-senha"></a>

### 4. Mudar a senha

#### `PATCH` `/usuario/resetar-senha`

Essa é a rota que será utilizada para possibilitar ao usuário realizar a mudança de senha, a partir do e-mail enviado.

- **Requisição**<br>
  Parâmetro obrigatório do tipo query 'token'.  
   Sem parâmetros de rota.  
   O corpo (body) deverá possuir um objeto com a propriedade 'password'.

- **Resposta**  
   Em caso de **sucesso**, não será enviado conteúdo no corpo (body) da resposta, status 204.  
   Em caso de **falha na requisição**, a resposta possuirá um **_status code_** apropriado, e em seu corpo (body) haverá um objeto com uma propriedade **mensagem**, explicando o motivo da falha.

#### Exemplo de requisição

```javascript
// PATCH /usuario/resetar-senha?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ
// Sem conteúdo no corpo (body) da requisição
```

#### Exemplos de resposta

```javascript
// HTTP Status 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 401
{
  "mensagem": "Token expirou."
}
```

---

<a id="post-login"></a>

### 5. Login do usuário

#### `POST` `/login`

Essa rota permite que o usuário cadastrado realize o login no sistema.

- **Requisição**  
   Sem parâmetros de rota ou de query.  
   O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - email
  - password

  <br>

- **Resposta**  
   Em caso de **sucesso**, o corpo (body) da resposta terá um objeto com informações do usuário logado e a propriedade **token**, que possuirá como valor o token de autenticação gerado.<br>
  Em caso de **falha na validação**, a resposta possuirá um **_status code_** apropriado, e em seu corpo (body) haverá um objeto com uma propriedade **mensagem**, explicando o motivo da falha.

#### Exemplo de requisição

```javascript
// POST /login
{
  "email": "jose@email.com",
  "password": "123456"
}
```

#### Exemplos de resposta

```javascript
// HTTP Status 200
{
  "user": {
      "id": "d3fb9d10-b4a1-41a2-9117-6e72f85107bd",
      "name": "José"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

```javascript
// HTTP Status 401
{
  "mensagem": "Email e/ou senha inválido(s)."
}
```

---

**_ATENÇÃO: Todas as funcionalidades (endpoints) a seguir, a partir desse ponto, deverão exigir o token de autenticação do usuário logado, recebendo no header com o formato Bearer Token. Portanto, em cada funcionalidade será necessário validar o token informado._**

---

<a id="get-resumo"></a>

### 6. Obter resumo de cobranças e clientes

#### `GET` `/resumo`

Essa é a rota que será chamada para a obtenção de um resumo de cobranças e clientes.

- **Requisição**  
   Sem parâmetros de rota ou de query.  
   Não deverá possuir conteúdo no corpo (body) da requisição.

- **Resposta**  
   Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um objeto com informações de cobranças e clientes.  
   Em caso de **falha na requisição**, a resposta possuirá um **_status code_** apropriado, e em seu corpo (body) haverá um objeto com uma propriedade **mensagem**, explicando o motivo da falha.

#### Exemplo de requisição

```javascript
// GET /resumo
// Sem conteúdo no corpo (body) da requisição
```

#### Exemplos de resposta

```javascript
// HTTP Status 200
{
  "charges": {
    "paidCharges": {
      "totalValue": 1000000,
      "quantity": 1,
      "charges": [
        {
          "client_name": "João",
          "id": "28e1c611-f81f-47ba-8da2-22ff2bd52847",
          "serial_id": 1,
          "value": 1000000
        }
      ]
    },
    "overdueCharges": {
      "totalValue": 1099,
      "quantity": 1,
      "charges": [
        {
          "client_name": "Luis",
          "id": "711a950a-93ea-4242-b845-566abbce5202",
          "serial_id": 2,
          "value": 1099
        }
      ]
    },
    "pendingCharges": {
      "totalValue": 1500,
      "quantity": 1,
      "charges": [
        {
          "client_name": "Luis",
          "id": "0008b4b2-081a-4dda-8064-a892fdfdf498",
          "serial_id": 3,
          "value": 1500
        }
      ]
    },
    "clients": {
      "defaultingClients": {
        "quantity": 1,
        "clients": [
          {
            "name": "João",
            "id": "b01166e1-cd24-4fb4-998e-e46a2b8a5e24",
            "serial_id": 1,
            "cpf": "80179678027"
          }
        ]
      },
      "upToDateClients": {
        "quantity": 1,
        "clients": [
          {
            "name": "Caldeira",
            "id": "c8336dc5-8cb9-4862-9ab9-8591df369190",
            "serial_id": 2,
            "cpf": "09246423003"
          }
        ]
      }
    }
  }
}

```

---

<a id="detalhar-usuario"></a>

### 7. Detalhar usuário

#### `GET` `/usuario`

Essa é a rota que será chamada quando for necessário consultar os dados do usuário logado.

- **Requisição**  
   Sem parâmetros de rota ou de query.  
   Não deverá possuir conteúdo no corpo (body) da requisição.

- **Resposta**  
   Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um objeto com todas as informações do usuário.  
   Em caso de **falha na atualização**, a resposta possuirá um **_status code_** apropriado, e em seu corpo (body) haverá um objeto com uma propriedade **mensagem**, explicando o motivo da falha.

#### Exemplo de requisição

```javascript
// GET /usuario
// Sem conteúdo no corpo (body) da requisição
```

#### Exemplos de resposta

```javascript
// HTTP Status 200
{
  "id": "71e83f36-0b53-4620-91e9-29c0f2196e1b",
  "name": "José",
  "email": "jose@email.com",
  "cpf": "34324587035",
  "phone": "2727371652"
}
```

```javascript
// HTTP Status 401
{
  "mensagem": "Usuário não autorizado."
}
```

---

<a id="editar-usuario"></a>

### 8. Editar usuário

#### `PUT` `/usuario`

Essa é a rota que será chamada quando o usuário quiser realizar alterações no seu próprio usuário.

- **Requisição**  
   Sem parâmetros de rota ou de query.  
   O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - name\*
  - email\*
  - oldPassword
  - newPassword
  - cpf
  - phone

  <br>

  **OBS:**<br>
  **1. Propriedades marcadas com `*` são obrigatórias.**<br>
  **2. Caso o usuário queira alterar a senha, o oldPassword e o newPassword deverão ser informados.**

- **Resposta**  
   Em caso de **sucesso**, não será enviado conteúdo no corpo (body) da resposta, status 204.  
   Em caso de **falha na atualização**, a resposta possuirá um **_status code_** apropriado, e em seu corpo (body) haverá um objeto com uma propriedade **mensagem**, explicando o motivo da falha.

#### Exemplo de requisição

```javascript
// PUT /usuario
{
  "name": "José de Abreu",
  "email": "jose_abreu@email.com",
  "oldPassword": "j4321",
  "newPassword": "123456",
  "cpf": "34324587035",
  "phone": "85978162286"
}
```

#### Exemplos de resposta

```javascript
// HTTP Status 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400
{
  "mensagem": "Este email já está sendo utilizado."
}
```

---

<a id="listar-clientes"></a>

### 9. Listar clientes

#### `GET` `/cliente`

Essa é a rota que será chamada quando o usuário logado quiser listar todos os clientes cadastrados.

- **Requisição**<br>
  Parâmetro opcional do tipo query 'status' para **filtro**.  
   Sem parâmetros de rota.  
   Não deverá possuir conteúdo no corpo (body) da requisição.

- **Resposta**  
   Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um array dos objetos (clientes) encontrados.  
   Em caso de **falha na requisição**, a resposta possuirá um **_status code_** apropriado, e em seu corpo (body) haverá um objeto com uma propriedade **mensagem**, explicando o motivo da falha.

#### Exemplo de requisição

```javascript
// GET /cliente
// Sem conteúdo no corpo (body) da requisição
```

#### Exemplos de resposta

```javascript
// HTTP Status 200
[
  {
    "id": "b01166e1-cd24-4fb4-998e-e46a2b8a5e24",
    "serial_id": 1,
    "name": "João Santos",
    "email": "joao@email.com",
    "phone": "88988887777",
    "cpf": "80179678027",
    "status": "Inadimplente"
  },
  {
    "id": "6de1acbe-51e8-48a3-a449-27139f547990",
    "serial_id": 2,
    "name": "Luis Barros",
    "email": "luis@email.com",
    "phone": "88975488328",
    "cpf": "78766076080",
    "status": "Em dia"
  }
]
```

Em caso de não haver clientes cadastrados, a resposta esperada será:

```javascript
// HTTP Status 200
[]
```

#### Exemplo de requisição com filtro

```javascript
// GET /cliente?status=em%20dia
// Sem conteúdo no corpo (body) da requisição
```

#### Exemplos de resposta com filtro

```javascript
// HTTP Status 200
[
  {
    "id": "6de1acbe-51e8-48a3-a449-27139f547990",
    "serial_id": 2,
    "name": "Luis Barros",
    "email": "luis@email.com",
    "phone": "88975488328",
    "cpf": "78766076080",
    "status": "Em dia"
  }
]
```

---

<a id="cadastrar-cliente"></a>

### 10. Cadastrar cliente

#### `POST` `/cliente`

Essa é a rota que será utilizada para cadastrar um cliente.

- **Requisição**  
   Sem parâmetros de rota ou de query.  
   O corpo (body) da requisição deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - name\*
  - email\*
  - cpf\*
  - phone\*
  - zipcode
  - address
  - complement
  - city
  - state
  - neighborhood

  <br>

  **OBS: Propriedades marcadas com `*` são obrigatórias**

- **Resposta**<br>
  Em caso de **sucesso**, não será enviado conteúdo no corpo (body) da resposta, status 204.<br>
  Em caso de **falha na requisição**, a resposta possuirá um **_status code_** apropriado, e em seu corpo (body) haverá um objeto com uma propriedade **mensagem**, explicando o motivo da falha.

#### Exemplo de requisição

```javascript
// POST /cliente
{
  "name": "Caldeira Ferrer",
  "email": "caldeira5@email.com",
  "cpf": "06141337007",
  "phone": "88988888888",
  "zipcode": "65468181",
  "address": "Rua Joana D'Arc",
  "complement": "Próximo ao Shopping da Esquina",
  "city": "Fortaleza",
  "state": "CE",
  "neighborhood": "Parque Manibura"
}
```

#### Exemplos de resposta

```javascript
// HTTP Status 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400
{
  "mensagem": "CPF já está cadastrado."
}
```

---

<a id="detalhar-cliente"></a>

### 11. Detalhar cliente

#### `GET` `/cliente/:id`

Essa é a rota que será chamada para detalhar as informações do cliente.

- **Requisição**  
   Deverá ser enviado o ID do cliente no parâmetro de rota do endpoint.  
   Não deverá possuir queries ou conteúdo no corpo (body) da requisição.

- **Resposta**  
   Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um objeto com todas as informações do cliente.<br>
  Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

#### Exemplo de requisição

```javascript
// GET /cliente/b01166e1-cd24-4fb4-998e-e46a2b8a5e24
// Sem conteúdo no corpo (body) da requisição
```

#### Exemplos de resposta

```javascript
// HTTP Status 200

{
  "client": {
    "id": "b01166e1-cd24-4fb4-998e-e46a2b8a5e24",
    "name": "João",
    "email": "joao@email.com",
    "cpf": "80179678027",
    "phone": "88988887777",
    "zipcode": "58433583",
    "address": "Rua Dois",
    "complement": "Vizinho a Rua Um",
    "neighborhood": "Centro",
    "city": "São Paulo",
    "state": "São Paulo",
    "serial_id": 1
  },
  "charges": [
    {
      "id": "28e1c611-f81f-47ba-8da2-22ff2bd52847",
      "serial_id": 1,
      "description": "não está devendo",
      "status": "pago",
      "value": 1000000,
      "due_date": "2023-02-07T03:00:00.000Z"
    },
    {
      "id": "9f0685fb-9f19-4a0d-8be9-a4a30fd01d4a",
      "serial_id": 2,
      "description": "dívida",
      "status": "pendente",
      "value": 1000000,
      "due_date": "2023-02-08T03:00:00.000Z"
    }
  ]
}

```

```javascript
// HTTP Status 404

{
  "mensagem": "Não há cliente registrado com o ID informado."
}
```

---

<a id="editar-cliente"></a>

### 12. Editar cliente

#### `PUT` `/cliente/:id`

Essa é a rota que será chamada para editar os dados de um cliente cadastrado.

- **Requisição**  
   Deverá ser enviado o ID do cliente no parâmetro de rota do endpoint.  
   O corpo (body) da requisição deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - name\*
  - email\*
  - cpf\*
  - phone\*
  - zipcode
  - address
  - complement
  - city
  - state
  - neighborhood

  <br>

  **OBS: Propriedades marcadas com `*` são obrigatórias**

- **Resposta**  
  Em caso de **sucesso**, não será enviado conteúdo no corpo (body) da resposta, status 204.<br>
  Em caso de **falha na requisição**, a resposta possuirá um **_status code_** apropriado, e em seu corpo (body) haverá um objeto com uma propriedade **mensagem**, explicando o motivo da falha.

#### Exemplo de requisição

```javascript
// PUT /cliente/28e1c611-f81f-47ba-8da2-22ff2bd52847
{
  "name": "Caldeira Ferrer",
  "email": "caldeira5@email.com",
  "cpf": "06141337007",
  "phone": "88988888888",
  "zipcode": "65468181",
  "address": "Rua Joana D'Arc",
  "complement": "Próximo ao Shopping da Esquina",
  "city": "Fortaleza",
  "state": "CE",
  "neighborhood": "Parque Manibura"
}
```

#### Exemplos de resposta

```javascript
// HTTP Status 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400
{
  "mensagem": "Este email já está sendo utilizado."
}
```

---

<a id="listar-cobrancas"></a>

### 13. Listar cobranças

#### `GET` `/cobranca`

Essa é a rota que será chamada quando o usuário logado quiser listar todas as cobranças cadastradas.

- **Requisição**  
  Parâmetro opcional do tipo query 'status' para **filtro**.
  Sem parâmetros de rota.  
   Não deverá possuir conteúdo no corpo (body) da requisição.

- **Resposta**  
   Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um array dos objetos (cobranças) encontrados.  
   Em caso de **falha na requisição**, a resposta possuirá um **_status code_** apropriado, e em seu corpo (body) haverá um objeto com uma propriedade **mensagem**, explicando o motivo da falha.

#### Exemplo de requisição

```javascript
// GET /cobranca
// Sem conteúdo no corpo (body) da requisição
```

#### Exemplos de resposta

```javascript
// HTTP Status 200
[
  {
    "id": "711a950a-93ea-4242-b845-566abbce5202",
    "serial_id": 1,
    "client_name": "Luis",
    "description": "devendo mais",
    "status": "Vencido",
    "value": 1000000,
    "due_date": "2023-02-09T03:00:00.000Z"
  },
  {
    "id": "28e1c611-f81f-47ba-8da2-22ff2bd52847",
    "serial_id": 2,
    "client_name": "João",
    "description": "não está devendo",
    "status": "Pago",
    "value": 1000000,
    "due_date": "2023-02-07T03:00:00.000Z"
  },
  {
    "id": "c3a5d65c-17ef-4750-bf76-d0d8774a6a2e",
    "serial_id": 3,
    "client_name": "Luis",
    "description": "nova cobrança",
    "status": "Pendente",
    "value": 1500,
    "due_date": "2023-08-02T03:00:00.000Z"
  }
]
```

Em caso de não haver clientes cadastrados, a resposta esperada será:

```javascript
// HTTP Status 200
[]
```

#### Exemplo de requisição com filtro

```javascript
// GET /cobranca?status=vencido
// Sem conteúdo no corpo (body) da requisição
```

#### Exemplos de resposta com filtro

```javascript
[
  {
    "id": "711a950a-93ea-4242-b845-566abbce5202",
    "serial_id": 1,
    "client_name": "Luis",
    "description": "devendo mais",
    "status": "Vencido",
    "value": 1000000,
    "due_date": "2023-02-09T03:00:00.000Z"
  }
]
```

---

<a id="cadastrar-cobranca"></a>

### 14. Cadastrar cobrança

#### `POST` `/cobranca`

Essa é a rota que será utilizada para cadastrar uma cobrança.

- **Requisição**  
   Sem parâmetros de rota ou de query.  
   O corpo (body) da requisição deverá, obrigatoriamente, possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - client_id
  - description
  - status (deve ser: 'pago' ou 'pendente')
  - value
  - due_date (AAAA-MM-DD)

  <br>

- **Resposta**<br>
  Em caso de **sucesso**, não será enviado conteúdo no corpo (body) da resposta, status 204.<br>
  Em caso de **falha na requisição**, a resposta possuirá um **_status code_** apropriado, e em seu corpo (body) haverá um objeto com uma propriedade **mensagem**, explicando o motivo da falha.

#### Exemplo de requisição

```javascript
// POST /cobranca
{
  "client_id": "6de1acbe-51e8-48a3-a449-27139f547990",
  "description": "nova cobrança",
  "status": "pago",
  "value": 1000,
  "due_date": "2023-02-10"
}
```

#### Exemplos de resposta

```javascript
// HTTP Status 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400
{
  "mensagem": "O campo status precisa conter uma das seguintes palavras: 'pago' ou 'pendente'."
}
```

---

<a id="detalhar-cobranca"></a>

### 15. Detalhar cobrança

#### `GET` `/cobranca/:id`

Essa é a rota que será chamada para detalhar uma cobrança.

- **Requisição**  
   Deverá ser enviado o ID da cobrança no parâmetro de rota do endpoint.  
   Não deverá possuir queries ou conteúdo no corpo (body) da requisição.

- **Resposta**  
   Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um objeto com todas as informações da cobrança.<br>
  Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

#### Exemplo de requisição

```javascript
// GET /cobranca/c3a5d65c-17ef-4750-bf76-d0d8774a6a2e
// Sem conteúdo no corpo (body) da requisição
```

#### Exemplos de resposta

```javascript
// HTTP Status 200

{
  "id": "c3a5d65c-17ef-4750-bf76-d0d8774a6a2e",
  "serial_id": 1,
  "client_name": "Luis",
  "description": "nova cobrança",
  "status": "Pendente",
  "value": 1500,
  "due_date": "2023-08-02T03:00:00.000Z"
}
```

```javascript
// HTTP Status 404

{
  "mensagem": "Não há cobrança registrada com o ID informado."
}
```

---

<a id="editar-cobranca"></a>

### 16. Editar cobrança

#### `PATCH` `/cobranca/:id`

Essa é a rota que será chamada para editar os dados de uma cobrança cadastrada.

- **Requisição**  
   Deverá ser enviado o ID da cobrança no parâmetro de rota do endpoint.  
   O corpo (body) da requisição deverá possuir, obrigatoriamente, um objeto com as seguintes propriedades (respeitando estes nomes):

  - description
  - status (deve ser: 'pago' ou 'pendente')
  - value
  - due_date (AAAA-MM-DD)

  <br>

- **Resposta**  
  Em caso de **sucesso**, não será enviado conteúdo no corpo (body) da resposta, status 204.<br>
  Em caso de **falha na requisição**, a resposta possuirá um **_status code_** apropriado, e em seu corpo (body) haverá um objeto com uma propriedade **mensagem**, explicando o motivo da falha.

#### Exemplo de requisição

```javascript
// PATCH /cobranca/28e1c611-f81f-47ba-8da2-22ff2bd52847
{
  "description": "nova cobrança",
  "status": "Pendente",
  "value": 1500,
  "due_date": "2023-02-28"
}
```

#### Exemplos de resposta

```javascript
// HTTP Status 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 404

{
  "mensagem": "Não há cobrança registrada com o ID informado."
}
```

---

<a id="excluir-cobranca"></a>

### 17. Excluir cobrança

#### `DELETE` `/cobranca/:id`

Essa é a rota que será chamada para excluir uma cobrança cadastrada.

- **Requisição**  
   Deverá ser enviado o ID da cobrança no parâmetro de rota do endpoint.  
   O corpo (body) da requisição não deverá possuir nenhum conteúdo.

  **ATENÇÃO: cobranças pagas ou vencidas não podem ser excluídas.**

- **Resposta**  
   Em caso de **sucesso**, não deveremos enviar conteúdo no corpo (body) da resposta.  
   Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

#### Exemplo de requisição

```javascript
// DELETE /cobranca/28e1c611-f81f-47ba-8da2-22ff2bd52847
// Sem conteúdo no corpo (body) da requisição
```

#### Exemplos de resposta

```javascript
// HTTP Status 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400
{
  "mensagem": "Esta cobrança está paga e não pode ser excluída."
}
```

<br/>

## ✔️ Tecnologias Utilizadas

<br/>

- Bcrypt
- Cors
- Cpf-Cnpj-Validator
- Date-fns
- Dotenv
- Express
- Handlebars
- JavaScript
- Joi
- JWT
- Knex
- NodeJS
- Nodemon
- PG
- PostgreSQL

---

#### Autores

| [<img src="https://avatars.githubusercontent.com/u/108552168?v=4" width=115><br><sub>Davi Kennedy</sub>](https://github.com/davi-kennedy) | [<img src="https://avatars.githubusercontent.com/u/108550464?v=4" width=115><br><sub>Igor Carvalho</sub>](https://github.com/IgorEiche) | [<img src="https://avatars.githubusercontent.com/u/108551927?v=4" width=115><br><sub>Matheus Dário</sub>](https://github.com/mathdario) | [<img src="https://avatars.githubusercontent.com/u/108550211?v=4" width=115><br><sub>Pedro Feba</sub>](https://github.com/phfeba) | [<img src="https://avatars.githubusercontent.com/u/107655415?v=4" width=115><br><sub>Petter Kraus</sub>](https://github.com/petterkraus) |
| :---------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------: | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |

---
