
<div align="center">

<img src="./public/assets/imgs/Logo%20SURFTRACK.png" alt="Logo SurfTrack" width="600">

### Cada onda conta uma história.

**Projeto Individual | Análise e Desenvolvimento de Sistemas**

São Paulo Tech School — SPTech | 2026/2

</div>

---

## Sobre o projeto

O **SurfTrack** é uma plataforma web desenvolvida para surfistas que desejam registrar suas sessões de surf e acompanhar sua evolução no esporte.

A proposta é transformar cada experiência no mar em informações organizadas, permitindo ao usuário visualizar seu histórico, conhecer melhor seus hábitos e acompanhar seus indicadores pessoais.

O projeto foi desenvolvido durante o primeiro semestre do curso de **Análise e Desenvolvimento de Sistemas da São Paulo Tech School (SPTech)**, unindo a paixão pelo surf aos conhecimentos adquiridos em programação.

## Funcionalidades

- **Cadastro e login:** criação de contas e acesso à plataforma.
- **Exploração de praias:** apresentação de praias brasileiras para a prática do surf.
- **Registro de sessões:** informações sobre data, praia, duração, quantidade de ondas, tamanho da prancha e avaliação.
- **Histórico de sessões:** acompanhamento dos registros realizados pelo surfista.
- **Dashboard:** visualização de indicadores pessoais, como total de sessões, tempo no mar, ondas surfadas e nota média.
- **Gráfico de praias:** identificação das praias mais frequentadas pelo usuário.

> Algumas funcionalidades estão em desenvolvimento e integração com o banco de dados.

## Tecnologias utilizadas

O SurfTrack utiliza as seguintes tecnologias:

- **HTML5:** estrutura das páginas.
- **CSS3:** estilização e responsividade.
- **JavaScript:** validação de formulários e interatividade.
- **Node.js e Express:** desenvolvimento do backend e das rotas da API.
- **MySQL:** armazenamento dos dados.
- **Git e GitHub:** versionamento e acompanhamento do projeto.

## Estrutura do projeto

O SurfTrack possui quatro páginas principais:

| Página | Descrição |
|---|---|
| Home | Apresentação da plataforma e das praias |
| Cadastro | Criação de conta do usuário |
| Login | Acesso à plataforma |
| Dashboard | Registro e acompanhamento das sessões de surf |

## Banco de dados

O banco de dados `surftrack` foi estruturado em três tabelas principais:

- `usuario`: informações dos usuários cadastrados.
- `praia`: cadastro das praias disponíveis.
- `sessaoSurf`: armazenamento das sessões de surf, relacionadas aos usuários e às praias.

## Como executar o projeto

**1. Clone o repositório:**

```bash
git clone https://github.com/nathangsacks/SurfTrack.git
```

**2. Acesse a pasta do projeto:**

```bash
cd SurfTrack
```

**3. Instale as dependências:**

```bash
npm install
```

**4. Configure o banco de dados:**

Crie o banco MySQL utilizando o script disponível em:

`src/database/script-tabelas.sql`

Configure as variáveis de ambiente do projeto com as informações de conexão do seu MySQL.

**5. Inicie o servidor:**

```bash
npm start
```

**6. Acesse a aplicação:**

```text
http://localhost:3333
```

A porta poderá variar conforme as configurações do ambiente.

---

## Autor

**Nathan Gabriel Sacks**

Análise e Desenvolvimento de Sistemas — 1º semestre

São Paulo Tech School — SPTech

Projeto Individual — 2026/2

---

<div align="center">

**SURFTRACK**

*Cada onda conta uma história.*

</div>
