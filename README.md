# 🎮 Jogo da Velha - 5 Níveis

Um jogo da velha completo com 5 níveis de dificuldade, desenvolvido como PWA (Progressive Web App) para Android.

## 🚀 **IMPORTANTE: Ativar GitHub Pages**

Para que o PWA funcione corretamente, você precisa ativar o GitHub Pages:

1. **Vá para**: https://github.com/Claudine222z/jogo-da-velha-pwa
2. **Clique em "Settings"** (aba superior)
3. **Role para baixo até "Pages"** (menu lateral esquerdo)
4. **Em "Source", selecione**: "Deploy from a branch"
5. **Escolha a branch**: "main"
6. **Clique "Save"**
7. **Aguarde 2-3 minutos** para o deploy

**URL do jogo**: https://claudine222z.github.io/jogo-da-velha-pwa/

## ✨ Características

- **5 Níveis de Dificuldade**: Do fácil ao expert
- **PWA Completo**: Funciona offline, pode ser instalado no Android
- **Design Responsivo**: Otimizado para mobile e desktop
- **Interface Moderna**: UI/UX intuitiva e atrativa
- **Sistema de Pontuação**: Acompanha vitórias e derrotas
- **Animações Suaves**: Feedback visual para todas as ações

## 🎯 Níveis de Dificuldade

### Nível 1 - Fácil
- CPU faz jogadas completamente aleatórias
- Ideal para iniciantes e crianças

### Nível 2 - Iniciante
- CPU bloqueia vitórias óbvias do jogador
- Joga aleatoriamente quando não há ameaças

### Nível 3 - Intermediário
- CPU busca vitórias quando possível
- Bloqueia jogadas do jogador
- Prioriza centro e cantos

### Nível 4 - Difícil
- Usa algoritmo minimax com profundidade 3
- Estratégia avançada com poda alpha-beta
- Muito desafiador

### Nível 5 - Expert
- Algoritmo minimax com profundidade máxima
- Praticamente invencível
- Para jogadores experientes

## 🚀 Como Jogar

1. **Abrir o Jogo**: Abra `index.html` no navegador
2. **Escolher Nível**: Clique em "Mudar Nível" para selecionar a dificuldade
3. **Fazer Jogada**: Clique em uma célula vazia para colocar seu X
4. **Aguardar CPU**: A CPU fará sua jogada automaticamente
5. **Continuar**: O jogo continua até alguém vencer ou empatar

## 📱 Instalação no Android

### Método 1: Chrome/Edge
1. Abra o jogo no Chrome ou Edge
2. Toque no menu (⋮) → "Adicionar à tela inicial"
3. Confirme a instalação

### Método 2: Prompt de Instalação
- O navegador mostrará automaticamente um botão "Instalar" quando apropriado

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Design responsivo e animações
- **JavaScript ES6+**: Lógica do jogo e IA
- **PWA**: Service Worker, Manifest, Cache
- **Algoritmo Minimax**: IA para níveis avançados

## 📁 Estrutura do Projeto

```
jogo-da-velha/
├── index.html              # Página principal
├── styles.css              # Estilos CSS
├── app.js                  # Lógica do jogo
├── sw.js                   # Service Worker
├── manifest.json           # Manifest PWA
├── generate-icons.html     # Gerador de ícones
├── README.md              # Este arquivo
└── icons/                 # Ícones do app
    ├── icon-72x72.png
    ├── icon-96x96.png
    ├── icon-128x128.png
    ├── icon-144x144.png
    ├── icon-152x152.png
    ├── icon-192x192.png
    ├── icon-384x384.png
    └── icon-512x512.png
```

## 🎨 Personalização

### Cores
As cores principais podem ser alteradas no arquivo `styles.css`:
- Gradiente principal: `#667eea` → `#764ba2`
- Cor do tema: `#2196F3`
- X (jogador): `#e74c3c`
- O (CPU): `#3498db`

### Dificuldade
Para ajustar a dificuldade, modifique os parâmetros no arquivo `app.js`:
- Profundidade do minimax nos níveis 4 e 5
- Estratégias de cada nível

## 🔧 Funcionalidades PWA

- **Offline**: Funciona sem internet após primeira visita
- **Cache Inteligente**: Recursos essenciais salvos localmente
- **Instalação**: Pode ser instalado como app nativo
- **Notificações**: Suporte a push notifications
- **Background Sync**: Sincronização em segundo plano

## 📊 Sistema de Pontuação

- **Persistência**: Pontuação salva no localStorage
- **Reset**: Botão para zerar pontuação
- **Visualização**: Exibição em tempo real

## 🎮 Controles

- **Mouse/Touch**: Clique/toque nas células
- **Teclado**: ESC para fechar modais
- **Botões**: Novo jogo, mudar nível, resetar pontuação

## 🌐 Compatibilidade

- **Navegadores**: Chrome, Firefox, Safari, Edge
- **Dispositivos**: Android, iOS, Desktop
- **Versões**: Suporte a navegadores modernos (ES6+)

## 🚀 Como Executar

1. Clone ou baixe os arquivos
2. Abra `index.html` no navegador
3. Para gerar ícones: abra `generate-icons.html`
4. Para desenvolvimento: use um servidor local

### Servidor Local (Recomendado)
```bash
# Python 3
python -m http.server 8000

# Node.js (com http-server)
npx http-server

# PHP
php -S localhost:8000
```

## 📝 Licença

Este projeto é de código aberto e pode ser usado livremente para fins educacionais e pessoais.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir melhorias
- Adicionar novos recursos
- Melhorar a documentação

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique se está usando um navegador atualizado
2. Certifique-se de que JavaScript está habilitado
3. Para PWA: use HTTPS ou localhost

---

**Divirta-se jogando! 🎮** 