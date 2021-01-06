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
            if      ((number - 1) % 5 === 0) count.a += 1;
            else if ((number - 2) % 5 === 0) count.b += 1;
            else if ((number - 3) % 5 === 0) count.c += 1;
            else if ((number - 4) % 5 === 0) count.d += 1;
            else if ((number - 5) % 5 === 0) count.e += 1;
        });

        for (let chr in count)
            if (count[chr] < min.value || count[chr] > max.value) return false;

        return true;
    }
}