## 🚀 Funcionalidades

### 📱 Para o Cliente (Cardápio Digital)
- **Visualização de Produtos**: Cardápio interativo com produtos organizados por categorias (ex: Pratos Principais, Bebidas).
- **Design**: Cards de produtos com layout horizontal, imagens em destaque e separadores de categoria elegantes.
- **Carrinho de Compras**: Adição e remoção de itens, com cálculo automático do total.
- **Envio de Pedidos**: Fluxo simples para informar o número da mesa e enviar o pedido para a cozinha.

### 🛡️ Para o Gerente (Painel Administrativo)
- **Dashboard (Visão Geral)**:
    - **Monitoramento de Pedidos**: Lista em tempo real dos pedidos realizados, com detalhes da mesa, itens e valor total.
    - **Cálculo Automático**: O frontend calcula o total do pedido dinamicamente.
- **Gerenciamento de Produtos**:
    - **Adicionar Pratos**: Formulário completo com upload de imagens (integração com backend).
    - **Remover Pratos**: Exclusão fácil de itens do cardápio.
- **Upload de Imagens**: Integração para envio de fotos dos pratos.

## 🛠️ Tecnologias Utilizadas

- **React**: Biblioteca principal para construção da interface.
- **Vite**: Build tool rápida e leve.
- **Tailwind CSS**: Framework de estilização para um design responsivo e moderno.
- **Lucide React**: Biblioteca de ícones para uma interface visualmente rica.
- **Context API**: Gerenciamento de estado global (Carrinho, Produtos, Pedidos).

## 📦 Como Executar

1.  **Clone o repositório**:
    ```bash
    git clone https://github.com/Vinic-Dev/Trabalho-Final-POO-Frontend.git
    cd Trabalho-Final-POO-Frontend
    ```

2.  **Instale as dependências**:
    ```bash
    npm install
    ```

3.  **Execute o projeto**:
    ```bash
    npm run dev
    ```

4.  **Acesse no navegador**:
    O projeto estará rodando em `http://localhost:5173` (ou porta similar indicada no terminal).

## 🔗 Integração com Backend

Este frontend foi projetado para se comunicar com uma API Java Spring Boot.
- **Endpoints Principais**:
    - `GET /item`: Listar produtos.
    - `POST /item`: Adicionar produto.
    - `DELETE /item/{id}`: Remover produto.
    - `POST /item/upload`: Upload de imagens.
    - `POST /pedidos`: Enviar novo pedido.
    - `GET /pedidos`: Listar pedidos (Admin).

---

Desenvolvido por Vinic-Dev.