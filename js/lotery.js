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
        this.loadLastResult();
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

    loadLastResult() {
        const warn = document.querySelector('.lotery__warn span');

        const results = {
            lotofacil: '01-05-06-08-09-10-14-17-18-19-20-21-23-24-25',
            megasena: '11-13-16-36-53-57',
            quina: '05-11-44-60-80'
        };

        warn.textContent = results[this.loteryName];
    }
}