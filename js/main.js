class Lotery {
    loteryName;
    rowLength = 5;
    numbersLength = 5;

    maxDezenas = 18;
    minDezenas = 15;

    maxImpares = 13;
    minImpares = 3;

    constructor(lotery = 'lotofacil') {
        this.loteryName = lotery;
    }

    setup() {
        switch (this.loteryName) {
            case 'lotofacil':
                this.rowLength = 5;
                this.numbersLength = 5;
                this.maxDezenas = 18;
                this.minDezenas = 15;
                this.maxImpares = 13;
                this.minImpares = 3;
                break;

            case 'megasena':
                this.rowLength = 6;
                this.numbersLength = 10;
                this.maxDezenas = 15;
                this.minDezenas = 6;
                this.maxImpares = 15;
                this.minImpares = 0;
                break;

            case 'quina':
                this.rowLength = 8;
                this.numbersLength = 10;
                this.maxDezenas = 15;
                this.minDezenas = 5;
                this.maxImpares = 15;
                this.minImpares = 0;
                break;

            default:
                break;
        }

        this.clearLoteryContainer();
        this.clearTabsStyle();

        this.setLoteryBorder();
        this.setTitle();
        this.loadRows();
        this.loadNumbers();
    }

    clearLoteryContainer() {
        const loteryContainer = document.querySelector('.lotery__numbers');

        loteryContainer.innerHTML = '';
    }

    loadRows() {
        const loteryContainer = document.querySelector('.lotery__numbers');

        for (let i = 0; i < this.rowLength; i++) {
            const row = document.createElement('div');

            row.classList.add('lotery__row');
            loteryContainer.appendChild(row);
        }
    }

    loadNumbers() {
        const rows = document.querySelectorAll('.lotery__row');

        rows.forEach((row, index) => {
            const max = (index + 1) * this.numbersLength;
            const min = max - (this.numbersLength - 1);

            for (let i = min; i <= max; i++) {
                const number = document.createElement('span');

                number.classList.add('lotery__number');
                number.textContent = i.toString().padStart(2, '0');
                row.appendChild(number);
            }
        });
    }

    clearTabsStyle() {
        const titleHolder = document.querySelector('.lotery__title');
        const min = document.getElementById('min');
        const max = document.getElementById('max');

        titleHolder.classList.remove('lotofacil__title');
        titleHolder.classList.remove('megasena__title');
        titleHolder.classList.remove('quina__title');

        if (this.loteryName !== 'lotofacil') {
            min.setAttribute('disabled', 'disabled');
            max.setAttribute('disabled', 'disabled');
        }
        else {
            min.removeAttribute('disabled');
            max.removeAttribute('disabled');
        }
    }

    setLoteryBorder() {
        const lotery = document.querySelector('.lotery');

        switch (this.loteryName) {
            case 'lotofacil':
                lotery.style.borderColor = '#4b11a8';
                break;

            case 'megasena':
                lotery.style.borderColor = '#188038';
                break;

            case 'quina':
                lotery.style.borderColor = '#9b61f8';
                break;

            default:
                break;
        }
    }

    setTitle() {
        const titleHolder = document.querySelector('.lotery__title');

        titleHolder.textContent = this.loteryName.toUpperCase();
        titleHolder.classList.add('text--center', `${this.loteryName}__title`);
    }

    identifyNumbers(gameList, rules) {
        const numbers = document.querySelectorAll('.lotery__number');
        const selects = [...numbers].filter(number => gameList.indexOf(+number.textContent) !== -1);

        this.clearSelected();

        if (!rules.verifyPrimos(gameList))
            return rules.generateGame();

        if (!rules.verifyImpares(gameList))
            return rules.generateGame();

        if (this.loteryName === 'lotofacil' && !rules.verifyColumns(gameList))
            return rules.generateGame();

        selects.forEach(selected => {
            selected.classList.add(`${this.loteryName}__selected`);
        });
    }

    clearSelected() {
        const selects = document.querySelectorAll(`.${this.loteryName}__selected`);

        selects.forEach(selected => selected.classList.remove(`${this.loteryName}__selected`));
    }
}

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

class LoteryRules {
    constructor(loteryName) {
        this.game = new Lotery(loteryName);
        this.game.setup();
    }

    setMaxDezenas() {
        const controller = document.getElementById('dezenas');

        controller.addEventListener('change', (e) => {
            if (+e.currentTarget.value > this.game.maxDezenas)
                e.currentTarget.value = this.game.maxDezenas;
        });
    }

    setMaxImpares() {
        const controller = document.getElementById('impar');

        controller.addEventListener('change', (e) => {
            const dezenas = document.getElementById('dezenas');

            if (this.game.loteryName !== 'lotofacil' && +e.currentTarget.value > +dezenas.value)
                e.currentTarget.value = dezenas.value;

            else if (+e.currentTarget.value > this.game.maxImpares)
                e.currentTarget.value = this.game.maxImpares;
        });
    }

    setMaxPrimos() {
        const controller = document.getElementById('primos');

        controller.addEventListener('change', (e) => {
            const impares = document.getElementById('impar');

            if (this.game.loteryName !== 'lotofacil' && +e.currentTarget.value > +impares.value)
                e.currentTarget.value = impares.value;

            else if (+e.currentTarget.value > 9 && +e.currentTarget.value < +impares.value)
                e.currentTarget.value = 9;

            else if (+e.currentTarget.value > +impares.value)
                e.currentTarget.value = impares.value;
        })
    }

    generateGame(gameList = []) {
        const dezenas = document.getElementById('dezenas');
        const num = Math.floor(Math.random() * (this.game.rowLength * this.game.numbersLength + 1));

        if (num && gameList.indexOf(num) === -1)
            gameList.push(num);

        if (gameList.length === +dezenas.value)
            return this.game.identifyNumbers(gameList, this);

        return this.generateGame(gameList);
    }

    verifyPrimos(game) {
        const primos = document.getElementById('primos');
        let total = 0;

        game.forEach(number => {
            if (isPrime(number))
                total += 1;
        });

        return +primos.value === 0 || +primos.value === total;
    }

    verifyImpares(game) {
        const impares = document.getElementById('impar');
        let total = 0;

        game.forEach(number => {
            if (number % 2 !== 0)
                total += 1;
        });

        return +impares.value === total;
    }

    verifyColumns(game) {
        const min = document.getElementById('min');
        const max = document.getElementById('max');

        let count = { a: 0, b: 0, c: 0, d: 0, e: 0 };

        game.forEach(number => {
            if ((number - 1) % 5 === 0) count.a += 1;
            else if ((number - 2) % 5 === 0) count.b += 1;
            else if ((number - 3) % 5 === 0) count.c += 1;
            else if ((number - 4) % 5 === 0) count.d += 1;
            else if ((number - 5) % 5 === 0) count.e += 1;
        });

        for (let chr in count)
            if (count[chr] < min || count[chr] > max) return false;

        return true;
    }
}

const isPrime = num => {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++)
        if (num % i === 0) return false;
    return num > 1;
}

window.onload = () => {
    const rules = new LoteryRules();
    const moves = new LoteryMoves(rules);
    const button = document.getElementById('generate');

    rules.setMaxDezenas();
    rules.setMaxImpares();
    rules.setMaxPrimos();

    moves.clearFields();
    moves.holdChangeLotery();
    moves.denyStrings();

    button.onclick = () => {
        try {
            rules.generateGame();
        } catch (e) {
            window.alert('Combinação não encontrada. Tente alterar alguns valores!');
        }
    }
};