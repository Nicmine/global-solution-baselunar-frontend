## Desenvolvedores
* **Nicholas Maretto** - RM561725
* **Fernando Castanha** - RM562226
* **Gabriel Assis** - RM562280

* **Instituição:** FIAP

# Base Lunar - Aplicativo de Monitoramento Mobile

## Sobre o Projeto
Este aplicativo móvel foi desenvolvido em React Native como parte integrante da solução de engenharia para o ecossistema da Base Lunar Autônoma. A interface permite que os operadores acompanhem a telemetria em tempo real e gerenciem os níveis de insumos vitais (como oxigênio e combustível). O aplicativo consome os endpoints da API RESTful de forma assíncrona, fornecendo uma experiência fluida e nativa de monitoramento e cadastros através do celular.

## Tecnologias Utilizadas
* **React Native 0.85.3** e **React 19.2.3**
* **TypeScript** (Tipagem estática e segurança no fluxo de dados)
* **Axios** (Cliente HTTP para consumo assíncrono da API Back-End)
* **React Navigation / Bottom Tabs** (Gerenciamento de rotas e navegação por abas nativas)
* **React Native Vector Icons** (Componentização visual customizada)

## Estrutura de Diretórios
O código-fonte foi modularizado para seguir boas práticas de manutenibilidade e separação de conceitos:
* `src/components`: Componentes reutilizáveis de interface (cards, inputs, layouts).
* `src/screens`: Telas principais mapeadas pela árvore de navegação (Dashboard, Listagem, Cadastro).
* `src/services`: Arquivos de configuração de infraestrutura de rede e instâncias do Axios.

---

## Como Executar a Aplicação Localmente

>  **Automação de Ambiente:** O arquivo `android/gradle.properties` foi modificado com o parâmetro `org.gradle.java.home=C:/Program Files/Java/jdk-17` para blindar o compilador contra variações de ambiente. O arquivo `package.json` possui o script automatizado `"android-sync"` para realizar o direcionamento de pontes e túneis do ADB de forma transparente.

1. Certifique-se de ter o Node.js instalado e o dispositivo físico Android conectado via cabo USB com a **Depuração USB** ativa nas opções de desenvolvedor.
2. Abra o terminal de comandos diretamente na raiz do projeto mobile.
3. Realize a instalação limpa das dependências do ecossistema executando:
   ```bash
   npm install'
4. Incialize o servidor de empacotamento do Metro Bundler:
   ```bash
   npm start
5. Com o Metro em execução, abra uma nova aba de terminal na mesma pasta raiz do projeto e execute o script customizado de sincronização de portas para configurar as pontes reversas do ADB e disparar o app no dispositivo:
   ```bash
   npm run android-sync
---
**Conectividade:** O script integrado configura as portas 8080 e 8081 via comando nativo do Android Debug Bridge. Isso permite que a instância do Axios aponte diretamente para http://localhost:8080/api/recursos dentro do código do app, batendo de forma transparente na API Spring Boot que está rodando no seu computador.
