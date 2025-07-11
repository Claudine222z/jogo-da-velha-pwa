// Game State
class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.level = 1;
        this.scores = {
            player: 0,
            cpu: 0
        };
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        this.levelNames = {
            1: 'Fácil',
            2: 'Iniciante',
            3: 'Intermediário',
            4: 'Difícil',
            5: 'Expert'
        };
        
        this.init();
    }

    init() {
        this.loadScores();
        this.setupEventListeners();
        this.updateDisplay();
        this.registerServiceWorker();
    }

    setupEventListeners() {
        // Game board cells
        document.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', (e) => this.handleCellClick(e));
        });

        // Buttons
        document.getElementById('new-game-btn').addEventListener('click', () => this.newGame());
        document.getElementById('level-btn').addEventListener('click', () => this.showLevelModal());
        document.getElementById('reset-scores-btn').addEventListener('click', () => this.resetScores());

        // Modal events
        document.getElementById('close-modal').addEventListener('click', () => this.hideLevelModal());
        document.getElementById('play-again-btn').addEventListener('click', () => this.playAgain());
        document.getElementById('new-game-modal-btn').addEventListener('click', () => this.newGameFromModal());

        // Level selection
        document.querySelectorAll('.level-option').forEach(option => {
            option.addEventListener('click', (e) => this.selectLevel(e));
        });

        // Close modals on outside click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                }
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideLevelModal();
                this.hideGameOverModal();
            }
        });
    }

    handleCellClick(e) {
        const cell = e.target;
        const index = parseInt(cell.dataset.index);

        if (this.board[index] !== '' || !this.gameActive || this.currentPlayer !== 'X') {
            return;
        }

        this.makeMove(index, 'X');
        
        if (this.checkWinner()) {
            this.endGame('player');
            return;
        }

        if (this.checkDraw()) {
            this.endGame('draw');
            return;
        }

        this.currentPlayer = 'O';
        this.updateStatus('Turno da CPU...');
        
        // CPU move with delay for better UX
        setTimeout(() => {
            this.makeCPUMove();
        }, 500);
    }

    makeMove(index, player) {
        this.board[index] = player;
        const cell = document.querySelector(`[data-index="${index}"]`);
        cell.textContent = player;
        cell.classList.add(player.toLowerCase());
    }

    makeCPUMove() {
        const move = this.getCPUMove();
        this.makeMove(move, 'O');
        
        if (this.checkWinner()) {
            this.endGame('cpu');
            return;
        }

        if (this.checkDraw()) {
            this.endGame('draw');
            return;
        }

        this.currentPlayer = 'X';
        this.updateStatus('Seu turno! Clique em uma célula para jogar.');
    }

    getCPUMove() {
        const emptyCells = this.board.map((cell, index) => cell === '' ? index : -1).filter(index => index !== -1);
        
        if (emptyCells.length === 0) return -1;

        switch (this.level) {
            case 1: // Fácil - Moves aleatórios
                return this.getRandomMove(emptyCells);
            
            case 2: // Iniciante - Bloqueia vitórias óbvias
                return this.getBeginnerMove(emptyCells);
            
            case 3: // Intermediário - Busca vitórias e bloqueia
                return this.getIntermediateMove(emptyCells);
            
            case 4: // Difícil - Estratégia avançada
                return this.getAdvancedMove(emptyCells);
            
            case 5: // Expert - Praticamente invencível
                return this.getExpertMove(emptyCells);
            
            default:
                return this.getRandomMove(emptyCells);
        }
    }

    getRandomMove(emptyCells) {
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    getBeginnerMove(emptyCells) {
        // Primeiro, tenta bloquear uma vitória do jogador
        const blockingMove = this.findBlockingMove('X');
        if (blockingMove !== -1) {
            return blockingMove;
        }
        
        // Se não há bloqueio necessário, joga aleatoriamente
        return this.getRandomMove(emptyCells);
    }

    getIntermediateMove(emptyCells) {
        // Primeiro, tenta ganhar
        const winningMove = this.findWinningMove('O');
        if (winningMove !== -1) {
            return winningMove;
        }
        
        // Depois, tenta bloquear
        const blockingMove = this.findBlockingMove('X');
        if (blockingMove !== -1) {
            return blockingMove;
        }
        
        // Se não há vitória ou bloqueio, joga no centro ou cantos
        const center = 4;
        if (emptyCells.includes(center)) {
            return center;
        }
        
        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter(corner => emptyCells.includes(corner));
        if (availableCorners.length > 0) {
            return availableCorners[Math.floor(Math.random() * availableCorners.length)];
        }
        
        return this.getRandomMove(emptyCells);
    }

    getAdvancedMove(emptyCells) {
        // Usa minimax com profundidade limitada
        return this.minimaxMove(emptyCells, 3);
    }

    getExpertMove(emptyCells) {
        // Usa minimax com profundidade máxima
        return this.minimaxMove(emptyCells, 9);
    }

    findWinningMove(player) {
        for (let i = 0; i < 9; i++) {
            if (this.board[i] === '') {
                this.board[i] = player;
                if (this.checkWinnerForPlayer(player)) {
                    this.board[i] = '';
                    return i;
                }
                this.board[i] = '';
            }
        }
        return -1;
    }

    findBlockingMove(player) {
        return this.findWinningMove(player);
    }

    minimaxMove(emptyCells, depth) {
        let bestScore = -Infinity;
        let bestMove = emptyCells[0];

        for (const cell of emptyCells) {
            this.board[cell] = 'O';
            const score = this.minimax(this.board, depth - 1, false, -Infinity, Infinity);
            this.board[cell] = '';

            if (score > bestScore) {
                bestScore = score;
                bestMove = cell;
            }
        }

        return bestMove;
    }

    minimax(board, depth, isMaximizing, alpha, beta) {
        // Verifica se há um vencedor
        if (this.checkWinnerForPlayer('O')) return 1;
        if (this.checkWinnerForPlayer('X')) return -1;
        if (this.checkDraw() || depth === 0) return 0;

        const emptyCells = board.map((cell, index) => cell === '' ? index : -1).filter(index => index !== -1);

        if (isMaximizing) {
            let maxScore = -Infinity;
            for (const cell of emptyCells) {
                board[cell] = 'O';
                const score = this.minimax(board, depth - 1, false, alpha, beta);
                board[cell] = '';
                maxScore = Math.max(maxScore, score);
                alpha = Math.max(alpha, score);
                if (beta <= alpha) break; // Alpha-beta pruning
            }
            return maxScore;
        } else {
            let minScore = Infinity;
            for (const cell of emptyCells) {
                board[cell] = 'X';
                const score = this.minimax(board, depth - 1, true, alpha, beta);
                board[cell] = '';
                minScore = Math.min(minScore, score);
                beta = Math.min(beta, score);
                if (beta <= alpha) break; // Alpha-beta pruning
            }
            return minScore;
        }
    }

    checkWinner() {
        for (const combination of this.winningCombinations) {
            const [a, b, c] = combination;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.highlightWinningCells(combination);
                return true;
            }
        }
        return false;
    }

    checkWinnerForPlayer(player) {
        for (const combination of this.winningCombinations) {
            const [a, b, c] = combination;
            if (this.board[a] === player && this.board[b] === player && this.board[c] === player) {
                return true;
            }
        }
        return false;
    }

    checkDraw() {
        return this.board.every(cell => cell !== '');
    }

    highlightWinningCells(combination) {
        combination.forEach(index => {
            const cell = document.querySelector(`[data-index="${index}"]`);
            cell.classList.add('winning');
        });
    }

    endGame(result) {
        this.gameActive = false;
        
        switch (result) {
            case 'player':
                this.scores.player++;
                this.showGameOverModal('Parabéns! Você venceu! 🎉', 'victory');
                break;
            case 'cpu':
                this.scores.cpu++;
                this.showGameOverModal('CPU venceu! Tente novamente! 🤖', 'defeat');
                break;
            case 'draw':
                this.showGameOverModal('Empate! Que tal uma revanche? 🤝', 'draw');
                break;
        }
        
        this.saveScores();
        this.updateDisplay();
    }

    newGame() {
        this.resetBoard();
        this.gameActive = true;
        this.currentPlayer = 'X';
        this.updateStatus('Seu turno! Clique em uma célula para jogar.');
    }

    playAgain() {
        this.hideGameOverModal();
        this.newGame();
    }

    newGameFromModal() {
        this.hideGameOverModal();
        this.newGame();
    }

    resetBoard() {
        this.board = Array(9).fill('');
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell';
        });
    }

    selectLevel(e) {
        const level = parseInt(e.currentTarget.dataset.level);
        this.level = level;
        
        // Update UI
        document.querySelectorAll('.level-option').forEach(option => {
            option.classList.remove('selected');
        });
        e.currentTarget.classList.add('selected');
        
        this.updateDisplay();
        this.hideLevelModal();
        this.newGame();
    }

    showLevelModal() {
        document.getElementById('level-modal').classList.add('show');
        
        // Highlight current level
        document.querySelectorAll('.level-option').forEach(option => {
            option.classList.remove('selected');
            if (parseInt(option.dataset.level) === this.level) {
                option.classList.add('selected');
            }
        });
    }

    hideLevelModal() {
        document.getElementById('level-modal').classList.remove('show');
    }

    showGameOverModal(message, type) {
        const modal = document.getElementById('game-over-modal');
        const title = document.getElementById('game-over-title');
        const messageEl = document.getElementById('game-over-message');
        
        title.textContent = type === 'victory' ? '🎉 Vitória!' : 
                           type === 'defeat' ? '🤖 Derrota!' : '🤝 Empate!';
        messageEl.textContent = message;
        
        modal.classList.add('show');
    }

    hideGameOverModal() {
        document.getElementById('game-over-modal').classList.remove('show');
    }

    resetScores() {
        if (confirm('Tem certeza que deseja resetar a pontuação?')) {
            this.scores.player = 0;
            this.scores.cpu = 0;
            this.saveScores();
            this.updateDisplay();
        }
    }

    updateDisplay() {
        document.getElementById('player-score').textContent = this.scores.player;
        document.getElementById('cpu-score').textContent = this.scores.cpu;
        document.getElementById('current-level').textContent = this.level;
        document.getElementById('difficulty-name').textContent = this.levelNames[this.level];
    }

    updateStatus(message) {
        document.getElementById('status-message').textContent = message;
    }

    saveScores() {
        localStorage.setItem('tictactoe-scores', JSON.stringify(this.scores));
        localStorage.setItem('tictactoe-level', this.level.toString());
    }

    loadScores() {
        const savedScores = localStorage.getItem('tictactoe-scores');
        const savedLevel = localStorage.getItem('tictactoe-level');
        
        if (savedScores) {
            this.scores = JSON.parse(savedScores);
        }
        
        if (savedLevel) {
            this.level = parseInt(savedLevel);
        }
    }

    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js')
                .then(registration => {
                    console.log('Service Worker registrado com sucesso:', registration);
                })
                .catch(error => {
                    console.log('Falha ao registrar Service Worker:', error);
                });
        }
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});

// PWA Install prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show install button if needed
    const installButton = document.createElement('button');
    installButton.textContent = 'Instalar App';
    installButton.className = 'btn primary';
    installButton.style.position = 'fixed';
    installButton.style.top = '20px';
    installButton.style.right = '20px';
    installButton.style.zIndex = '1001';
    
    installButton.addEventListener('click', () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('Usuário aceitou a instalação');
                }
                deferredPrompt = null;
                installButton.remove();
            });
        }
    });
    
    document.body.appendChild(installButton);
});

// Handle app installed
window.addEventListener('appinstalled', () => {
    console.log('App instalado com sucesso');
    deferredPrompt = null;
}); 