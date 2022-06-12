# LenZ-glasses
## Projeto para a disciplina de Desenvolvimento Web 2022/1 
### Grupo 9
O projeto possui como tema uma loja virtual de óculos, tanto de grau quanto de sol, e lentes de contato.

Componentes do Grupo: 
Aluno | NUSP
------|-----
Gabriela Rodrigues do Prado | 11892917
Henrique Garcia Gomes do O | 10734331
Osni Brito de Jesus | 11857330

## Tabela de Conteúdos

- [1. Requisitos](#1-requisitos)
- [2. Descrição do Projeto](#2-descrição-do-projeto)
- [3. Comentários sobre o código](#3-comentários-sobre-o-código)
- [4. Plano de teste](#4-plano-de-teste)
- [5. Resultados dos testes](#5-resultados-dos-testes)
- [6. Building](#6-building)
- [7. Problemas](#7-problemas)
- [8. Comentários](#8-comentários)
### 1. Requisitos
O sistema consiste em um e-commerce de óculos e lentes de contato. Nesse sistema, temos os tipos de usuários: cliente e administrador. 

Os clientes são usuários que possuem o intuito de navegar pelo sistema e comprar algum dos produtos vendidos pela loja. Vale lembrar que alguns usuários apenas navegam pelo site, nesse caso, sendo considerados visitantes. Caso um visitante queira comprar algum produto, ele deve, obrigatoriamente, criar uma conta na loja e se tornar um cliente, de forma a fornecer os dados para o pedido.

Os administradores são funcionários da loja que possuem acesso aos dados dos clientes e dos pedidos feitos pelos mesmos. 

O registro de um cliente leva em conta dados como nome, CPF, e-mail, senha, endereço e telefone.

O registro de um administrador leva em conta dados como nome, CPF, e-mail, senha e telefone.

O registro dos produtos da loja inclui nome, id, foto, descrição, preço e disponibilidade (se existe em estoque ou se está esgotado).

Para a realização de uma compra, o usuário deve selecionar o produto e também a quantidade que deseja adquirir. Com isso, o produto vai direto para o carrinho de compras. O usuário pode escolher se continua comprando ou se prefere fechar o pedido. Caso escolha continuar comprando, é redirecionado de volta à página inicial do site. Caso prefira fechar o pedido, é redirecionado para uma página onde deverá realizar login ou, caso seja visitante, realizar um cadastro (se já estiver logado, o cliente irá direto para a próxima página). Após entrar no sistema, o cliente será direcionado para a página de revisão de compra, que basicamente revisa detalhes do pedido. Ao prosseguir, o cliente deve confirmar o endereço de entrega do produto. Para finalizar, a última ação antes da confirmação da compra é a seleção da forma de pagamento. Finalizadas todas as etapas, a compra é então confirmada.

O gerenciamento dos produtos do site é feito pelos administradores, que, entre as opções de registrar, editar ou excluir itens, também devem estar constantemente verificando a disponibilidade dos mesmos.

Como funcionalidade extra do projeto, é possível realizar o agendamento de um [exame oftalmológico](https://www.tuasaude.com/exame-oftalmologico/).

O sistema visa ser bem dinâmico e acessível, tornando facilitadas a venda e a execução da funcionalidade inicialmente propostas.

### 2. Descrição do Projeto

A loja virtual **LenZ Glasses** consiste em um e-commerce focado em acessórios óticos como óculos de sol, óculos de grau, armações e lentes de contato. Implementado em HTML, CSS, JavaScript e *(mais ferramentas aqui)*.

### Diagrama de Navegação:
##### (Diagrama de Navegação aqui)

As imagens do mockup estão em uma pasta separada nesse projeto.

### Funcionalidades
As funcionalidades do e-commerce LenZ Glasses são:
* Login com e-mail e senha, e opção para cadastro de novo cliente;
* Página própria para cliente, contendo informações, histórico de compras e agendamento de exames;
* Em caso de administradores, também possuem página própria diferente da de clientes para gerenciamento de vendas;
* Acesso à homepage, contendo itens recomendados;
* Página de visualização de um produto, com seu nome, preço, descrição, disponibilidade e botão para adicionar ao carrinho;
* Acesso ao carrinho de compras, com opção de mudar a quantidade de itens, conferir o preço total e finalizar compra;
* Opções de pagamento, registro de cartão de crédito, pix ou boleto;
* Opção de selecionar ou alterar endereço de entrega da compra;
* Opção de agendamento de exame oftalmológico. 

### Servidor 

Sobre o servidor, abaixo estão as informações que foram salvas:

#### Contas
* ID
* Nome
* E-mail
* Senha
* Admin (booleano)
* CPF
* Endereço
* Telefone

#### Produtos
* ID
* Nome do produto
* Preço
* Descrição
* Identificador da imagem
* Disponíbilidade (booleano)

### 3. Comentários sobre o código
### 4. Plano de teste
### 5. Resultados dos testes
### 6. Building
### 7. Problemas
### 8. Comentários
