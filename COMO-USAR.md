# 🚀 Como Usar o Jogo da Velha

## ⚡ Início Rápido

1. **Abra o arquivo `index.html` no seu navegador**
2. **Clique em "Mudar Nível" para escolher a dificuldade**
3. **Clique nas células para jogar!**

## 📱 Para Android (PWA)

### Instalar como App:
1. Abra o jogo no Chrome/Edge no Android
2. Toque no menu (⋮) → "Adicionar à tela inicial"
3. Confirme a instalação
4. O app aparecerá na tela inicial

### Funcionalidades PWA:
- ✅ Funciona offline
- ✅ Pode ser instalado
- ✅ Notificações
- ✅ Interface nativa

## 🎮 Níveis de Dificuldade

| Nível | Nome | Descrição |
|-------|------|-----------|
| 1 | Fácil | CPU joga aleatoriamente |
| 2 | Iniciante | CPU bloqueia vitórias óbvias |
| 3 | Intermediário | CPU busca vitórias e bloqueia |
| 4 | Difícil | Estratégia avançada (minimax) |
| 5 | Expert | Praticamente invencível |

## 🛠️ Para Desenvolvedores

### Executar Localmente:
```bash
# Com Python
python -m http.server 8000

# Com Node.js
npx http-server

# Com PHP
php -S localhost:8000
```

### Gerar Ícones:
1. Abra `generate-icons.html` no navegador
2. Clique em "Baixar" para cada tamanho
3. Mova os arquivos para a pasta `icons/`

### Estrutura dos Arquivos:
- `index.html` - Página principal
- `styles.css` - Estilos e design
- `app.js` - Lógica do jogo e IA
- `sw.js` - Service Worker (PWA)
- `manifest.json` - Configuração PWA

## 🎯 Dicas de Jogo

### Nível 1-2:
- Jogue no centro quando possível
- Bloqueie quando a CPU tiver 2 em linha

### Nível 3:
- Use estratégias de forquilha
- Priorize centro e cantos

### Nível 4-5:
- Jogue defensivamente
- A CPU é muito inteligente!

## 🔧 Solução de Problemas

### Jogo não carrega:
- Verifique se JavaScript está habilitado
- Use um navegador atualizado

### PWA não instala:
- Use HTTPS ou localhost
- Verifique se o Service Worker está registrado

### Ícones não aparecem:
- Gere os ícones usando `generate-icons.html`
- Verifique se os arquivos estão na pasta `icons/`

## 📞 Suporte

Se encontrar problemas:
1. Verifique o console do navegador (F12)
2. Teste em outro navegador
3. Verifique se todos os arquivos estão presentes

---

**Divirta-se! 🎮** 