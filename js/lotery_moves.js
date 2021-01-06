class LoteryMoves {
    constructor(rules) {
        this.rules = rules;
    }

    holdChangeLotery() {
        const tabs = document.querySelectorAll('.lotery__tabs span');

        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.rules.game.loteryName = e.currentTarget.textContent.toLowerCase();
                this.rules.game.setup();
                this.clearFields();

                tabs.forEach(tb => tb.classList.add('background--disabled'));
                e.currentTarget.classList.remove('background--disabled');
            });
        });
    }

    denyStrings() {
        const controllers = document.querySelectorAll('.lotery__controller input');

        controllers.forEach(controller => controller.addEventListener('keyup', (e) => {
            const target = e.currentTarget;

            if (!/\d/.test(e.key) && e.keyCode !== 8) {
                target.value = target.value.substring(0, target.value.length - 1);
            }
        }));
    }

    clearFields() {
        const dezenas = document.getElementById('dezenas');
        const impares = document.getElementById('impar');
        const primos = document.getElementById('primos');

        dezenas.value = this.rules.game.minDezenas;
        impares.value = this.rules.game.minImpares;
        primos.value = 0;

        dezenas.setAttribute('min', this.rules.game.minDezenas);
        impares.setAttribute('min', this.rules.game.minImpares);
    }
}