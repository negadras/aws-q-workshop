document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('gameForm');
    const guessInput = document.getElementById('guessInput');
    const gameGrid = document.getElementById('gameGrid');
    const keys = document.querySelectorAll('.key');
    
    let currentGuess = '';
    let currentRow = 0;
    let gameActive = true;
    const keyStates = {};
    const maxRows = 6;
    const maxCols = 6;

    // Initialize game
    initializeGrid();
    loadGameState();
    initializeKeyboard();

    function initializeGrid() {
        gameGrid.innerHTML = '';
        for (let row = 0; row < maxRows; row++) {
            const gridRow = document.createElement('div');
            gridRow.className = 'grid-row';
            gridRow.id = `row-${row}`;
            
            for (let col = 0; col < maxCols; col++) {
                const letterBox = document.createElement('div');
                letterBox.className = 'letter-box';
                letterBox.id = `box-${row}-${col}`;
                gridRow.appendChild(letterBox);
            }
            
            gameGrid.appendChild(gridRow);
        }
        updateActiveRow();
    }

    function loadGameState() {
        const historyData = document.querySelectorAll('.history-data');
        const attempts = parseInt(document.getElementById('currentAttempts')?.textContent || '0');
        const status = document.getElementById('gameStatus')?.textContent || 'INPROGRESS';
        
        currentRow = attempts;
        gameActive = status === 'INPROGRESS';
        
        historyData.forEach((data, index) => {
            const guess = data.getAttribute('data-guess');
            const feedback = data.getAttribute('data-feedback');
            
            if (guess && feedback) {
                displayGuessInGrid(guess, feedback, index);
                updateKeyboardFromGuess(guess, feedback);
            }
        });
        
        updateActiveRow();
    }

    function displayGuessInGrid(guess, feedback, rowIndex) {
        for (let i = 0; i < guess.length; i++) {
            const box = document.getElementById(`box-${rowIndex}-${i}`);
            if (box) {
                box.textContent = guess[i].toUpperCase();
                box.classList.add('filled');
                
                const feedbackChar = feedback[i];
                if (feedbackChar === '+') {
                    box.classList.add('correct');
                } else if (feedbackChar === '?') {
                    box.classList.add('wrong-position');
                } else {
                    box.classList.add('incorrect');
                }
            }
        }
    }

    function updateActiveRow() {
        document.querySelectorAll('.letter-box').forEach(box => {
            box.classList.remove('active-row');
        });
        
        if (gameActive && currentRow < maxRows) {
            for (let col = 0; col < maxCols; col++) {
                const box = document.getElementById(`box-${currentRow}-${col}`);
                if (box) {
                    box.classList.add('active-row');
                }
            }
        }
    }

    function initializeKeyboard() {
        keys.forEach(key => {
            key.addEventListener('click', handleKeyClick);
        });
        
        document.addEventListener('keydown', handlePhysicalKey);
    }

    function handleKeyClick(e) {
        const key = e.target.dataset.key;
        processKey(key);
    }

    function handlePhysicalKey(e) {
        if (e.key === 'Enter') {
            processKey('enter');
        } else if (e.key === 'Backspace') {
            processKey('backspace');
        } else if (/^[a-zA-Z]$/.test(e.key)) {
            processKey(e.key.toLowerCase());
        }
    }

    function processKey(key) {
        if (!gameActive || currentRow >= maxRows) return;
        
        if (key === 'enter') {
            if (currentGuess.length === 6) {
                submitGuess();
            }
        } else if (key === 'backspace') {
            if (currentGuess.length > 0) {
                currentGuess = currentGuess.slice(0, -1);
                updateCurrentRow();
            }
        } else if (/^[a-z]$/.test(key) && currentGuess.length < 6) {
            currentGuess += key;
            updateCurrentRow();
        }
    }

    function updateCurrentRow() {
        for (let col = 0; col < maxCols; col++) {
            const box = document.getElementById(`box-${currentRow}-${col}`);
            if (box) {
                if (col < currentGuess.length) {
                    box.textContent = currentGuess[col].toUpperCase();
                    box.classList.add('filled');
                } else {
                    box.textContent = '';
                    box.classList.remove('filled');
                }
            }
        }
    }

    function submitGuess() {
        guessInput.value = currentGuess;
        
        // Animate current row
        for (let col = 0; col < maxCols; col++) {
            const box = document.getElementById(`box-${currentRow}-${col}`);
            if (box) {
                setTimeout(() => {
                    box.classList.add('fade-in');
                }, col * 100);
            }
        }

        setTimeout(() => {
            form.submit();
        }, 600);
    }

    function updateKeyboardFromGuess(guess, feedback) {
        for (let i = 0; i < guess.length; i++) {
            const letter = guess[i].toLowerCase();
            const feedbackChar = feedback[i];
            
            let state = 'incorrect';
            if (feedbackChar === '+') {
                state = 'correct';
            } else if (feedbackChar === '?') {
                state = 'wrong-position';
            }
            
            updateKeyState(letter, state);
        }
    }

    function updateKeyState(letter, state) {
        const currentState = keyStates[letter];
        if (currentState === 'correct') return;
        if (currentState === 'wrong-position' && state === 'incorrect') return;
        
        keyStates[letter] = state;
        
        const keyElement = document.querySelector(`[data-key="${letter}"]`);
        if (keyElement) {
            keyElement.classList.remove('correct', 'wrong-position', 'incorrect');
            keyElement.classList.add(state);
        }
    }

    // Handle non-game forms
    const otherForms = document.querySelectorAll('form:not(#gameForm)');
    otherForms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            form.submit();
        });
    });
});

function shakeElement(element) {
    element.classList.add('shake');
    setTimeout(() => {
        element.classList.remove('shake');
    }, 820);
}