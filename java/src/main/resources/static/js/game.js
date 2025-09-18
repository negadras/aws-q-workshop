document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const guessInput = document.getElementById('guessInput');
    const guessedWord = document.getElementById('guessedWord');
    const result = document.getElementById('result');
    const message = document.querySelector('p[th\\:text="${message}"]');
    const submitButton = document.getElementById('submitBtn');
    const keys = document.querySelectorAll('.key');
    
    let currentGuess = '';
    const keyStates = {}; // Track key colors

    // Initialize keyboard
    initializeKeyboard();
    updateKeyboardFromHistory();

    function initializeKeyboard() {
        keys.forEach(key => {
            key.addEventListener('click', handleKeyClick);
        });
        
        // Physical keyboard support
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
        if (key === 'enter') {
            if (currentGuess.length === 6) {
                submitGuess();
            }
        } else if (key === 'backspace') {
            if (currentGuess.length > 0) {
                currentGuess = currentGuess.slice(0, -1);
                updateInput();
            }
        } else if (/^[a-z]$/.test(key) && currentGuess.length < 6) {
            currentGuess += key;
            updateInput();
        }
    }

    function updateInput() {
        if (guessInput) {
            guessInput.value = currentGuess.toUpperCase();
        }
    }

    function submitGuess() {
        if (guessInput) {
            guessInput.value = currentGuess;
        }
        
        // Clear previous displays
        if (guessedWord) {
            guessedWord.innerHTML = '';
        }
        if (result) {
            result.innerHTML = '';
        }
        
        // Animate new guess
        for (let i = 0; i < currentGuess.length; i++) {
            setTimeout(() => {
                const letterBox = document.createElement('span');
                letterBox.classList.add('letter-box', 'fade-in');
                letterBox.textContent = currentGuess[i];
                guessedWord.appendChild(letterBox);
            }, i * 100);
        }

        // Submit form after animation
        setTimeout(() => {
            if (form) {
                form.submit();
            }
        }, currentGuess.length * 100 + 300);
    }

    function updateKeyboardFromHistory() {
        const historyItems = document.querySelectorAll('.history-item');
        
        historyItems.forEach(item => {
            const guess = item.querySelector('.history-guess').textContent.toLowerCase();
            const feedbackSymbols = item.querySelectorAll('.feedback-symbol');
            
            feedbackSymbols.forEach((symbol, index) => {
                const letter = guess[index];
                let state = 'incorrect';
                
                if (symbol.classList.contains('symbol-correct')) {
                    state = 'correct';
                } else if (symbol.classList.contains('symbol-wrong-position')) {
                    state = 'wrong-position';
                }
                
                updateKeyState(letter, state);
            });
        });
    }

    function updateKeyState(letter, state) {
        // Priority: correct > wrong-position > incorrect
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

    // Handle non-game forms (PLAY AGAIN, TRY AGAIN)
    if (form && !guessInput) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            form.submit();
        });
    }

    // Add hover effect to letter boxes
    document.querySelectorAll('.letter-box').forEach(addHoverEffect);

    // Animate result boxes
    document.querySelectorAll('#result .letter-box').forEach((box, index) => {
        setTimeout(() => {
            box.classList.add('fade-in');
        }, index * 100);
    });

    // Shake animation for incorrect guesses
    if (message && message.textContent.includes('Incorrect')) {
        shakeElement(guessedWord);
    }
});

function addHoverEffect(element) {
    element.addEventListener('mouseover', function () {
        this.style.transform = 'scale(1.1)';
        this.style.transition = 'transform 0.3s';
    });
    element.addEventListener('mouseout', function () {
        this.style.transform = 'scale(1)';
    });
}

function shakeElement(element) {
    element.classList.add('shake');
    setTimeout(() => {
        element.classList.remove('shake');
    }, 820);
}