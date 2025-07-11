# 📱 Como Criar APK do Jogo da Velha

## 🚀 Método 1: PWA Builder (Mais Fácil)

### Passo 1: Ativar GitHub Pages
1. Vá para seu repositório: https://github.com/Claudine222z/jogo-da-velha-pwa
2. Clique em "Settings" (Configurações)
3. Role para baixo até "Pages"
4. Em "Source", selecione "Deploy from a branch"
5. Escolha "main" branch
6. Clique "Save"
7. Aguarde alguns minutos para o deploy

### Passo 2: Gerar APK
1. Acesse: https://www.pwabuilder.com/
2. Cole a URL: `https://claudine222z.github.io/jogo-da-velha-pwa/`
3. Clique em "Build My PWA"
4. Aguarde a análise
5. Clique em "Download" para baixar o APK

## 🔧 Método 2: Bubblewrap (Google)

### Pré-requisitos:
- Node.js instalado
- Android Studio
- Java JDK

### Comandos:
```bash
# Instalar Bubblewrap
npm install -g @bubblewrap/cli

# Inicializar projeto
bubblewrap init --manifest https://claudine222z.github.io/jogo-da-velha-pwa/manifest.json

# Gerar APK
bubblewrap build
```

## 📋 Método 3: Cordova (Avançado)

### Instalação:
```bash
npm install -g cordova
cordova create jogo-da-velha-cordova
cd jogo-da-velha-cordova
cordova platform add android
```

### Configuração:
1. Copie os arquivos do PWA para `www/`
2. Configure o `config.xml`
3. Execute: `cordova build android`

## 🎯 Recomendação

**Use o PWA Builder** - É o método mais simples e rápido!

## 📱 Após gerar o APK:

1. **Instalar no Android**:
   - Ative "Fontes desconhecidas" nas configurações
   - Instale o APK baixado

2. **Testar**:
   - Abra o app
   - Teste todos os níveis
   - Verifique se funciona offline

## 🔍 Solução de Problemas

### APK não instala:
- Verifique se "Fontes desconhecidas" está ativado
- Tente gerar novamente no PWA Builder

### App não funciona:
- Verifique se o GitHub Pages está ativo
- Teste a URL no navegador primeiro

### Ícones não aparecem:
- Gere os ícones usando `generate-icons.html`
- Faça upload dos ícones para o GitHub

## 📞 Suporte

Se tiver problemas:
1. Verifique se o GitHub Pages está funcionando
2. Teste a URL no navegador
3. Use o PWA Builder para diagnóstico

---

**Boa sorte! 🎮📱** 