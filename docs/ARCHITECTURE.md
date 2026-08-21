# Arquitetura inicial

## Produto

O Rover Client é um launcher pessoal. A responsabilidade principal da aplicação desktop é apresentar a biblioteca e iniciar executáveis de jogos já instalados.

## Camadas

```text
Renderer (UI)
    |
    | IPC seguro
    v
Electron Main
    |
    +--> iniciar .exe
    +--> abrir pasta
    +--> controles da janela
    |
    +--> Backend/API (perfil, jogos, amigos, XP etc.)
```

## Modelo de jogo

Cada jogo deverá possuir pelo menos:

- id
- nome
- gênero
- descrição
- desenvolvedora/publicadora
- caminho do executável local
- capa
- background
- mídia opcional
- configurações de personalização

## Regra de execução

O botão Jogar deve chamar o executável configurado pelo usuário. O launcher não deve alterar os arquivos do jogo nem assumir responsabilidade por instalação, atualização ou DRM.

## Evolução

A primeira implementação pode utilizar os serviços existentes como referência. O backend próprio poderá substituir a infraestrutura anterior sem exigir que a camada visual seja reconstruída.
