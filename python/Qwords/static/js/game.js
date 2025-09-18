document.addEventListener('DOMContentLoaded', function () {
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(input => {
        const form = input.closest('form');
        addHoverEffect(input);
        input.addEventListener('change', function () {
            validateForm(form);
        });
    });

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const input = form.querySelector('input[type="text"]');
        if (input) {
            form.addEventListener('submit', function (e) {
                if (!input.validity.valid) {
                    e.preventDefault();
                    shakeElement(input);
                }
            });

            if (input.name === "guess") {
                input.addEventListener('input', function (e) {
                    this.value = this.value.replace(/[^a-zA-Z]/g, '').toUpperCase();
                });
            } else if (input.name === "user") {
                input.addEventListener('input', function (e) {
                    this.value = this.value.replace(/[^a-zA-Z]/g, '');
                });
            }
        }
    });
});

function validateForm(form) {
    if (!form) return;
    const input = form.querySelector('input[type="text"]');
    const submitButton = form.querySelector('button[type="submit"]');
    if (!input || !submitButton) return;

    if (input.validity.valid) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

function addHoverEffect(element) {
    if (!element) return;

    element.addEventListener('mouseenter', () => {
        element.style.transform = 'scale(1.02)';
        element.style.transition = 'transform 0.3s ease';
    });

    element.addEventListener('mouseleave', () => {
        element.style.transform = 'scale(1)';
    });
}

function shakeElement(element) {
    if (!element) return;
    element.style.animation = 'shake 0.5s';
    element.addEventListener('animationend', () => {
        element.style.animation = '';
    });
}