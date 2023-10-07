const defaultCharacter = {
    name: '',
    life: 1,
    maxLife: 1,
    attack: 0,
    defense: 0
}
const createKnigt = (name) => {
    return {
        ...defaultCharacter,
        name,
        life: 100,
        maxLife: 100,
        attack: 10,
        defense: 8

    }
}
const createSorcerer = (name) => {
    return {
        ...defaultCharacter,
        name,
        life: 50,
        maxLife: 50,
        attack: 14,
        defense: 3

    }
}
const createLittleMonster = () => {
    return {
        ...defaultCharacter,
        name: 'LittleMonster',
        life: 40,
        maxLife: 40,
        attack: 4,
        defense: 4

    }
}
const createBigMonster = () => {
    return {
        ...defaultCharacter,
        name: 'BigMonster',
        life: 120,
        maxLife: 120,
        attack: 16,
        defense: 6

    }
}
const stage = {
    figther1: null,
    figther2: null,
    figther1E1: null,
    figther2E1: null,

    start(figther1, figther2, figther1E1, figther2E1) {
        this.figther1 = figther1;
        this.figther2 = figther2;
        this.figther1E1 = figther1E1;
        this.figther2E1 = figther2E1;

        this.figther1E1.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.figther1, this.figther2));
        this.figther2E1.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.figther2, this.figther1));

        this.update();
    },
    update() {
        this.figther1E1.querySelector('.name').innerHTML = `${this.figther1.name} - ${this.figther1.life} HP`;
        let f1Pct = (this.figther1.life / this.figther1.maxLife) * 100;
        this.figther1E1.querySelector('.bar').style.width = `${f1Pct}%`;


        this.figther2E1.querySelector('.name').innerHTML = `${this.figther2.name} - ${this.figther2.life} HP`;
        let f2Pct = (this.figther2.life / this.figther2.maxLife) * 100;
        this.figther2E1.querySelector('.bar').style.width = `${f2Pct}%`;
    },


    doAttack(attacking, attacked) {
        if (attacking.life <= 0 || attacked.life <= 0) {
            log.addMessage(`atacando cachorro morto`);
            return;
        }
        const attackFactor = (Math.random() * 2).toFixed(2);
        const defenseFactor = (Math.random() * 2).toFixed(2);

        const actualAttack = attacking.attack * attackFactor;
        const actualDefense = attacked.defense * defenseFactor;
        if (actualAttack > actualDefense) {
            attacked.life -= actualAttack;
            log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}`)
        } else {
            log.addMessage(`${attacked.name} conseguio defender...`)
        }
        this.update();

    },
}
const log = {
    list: [],
    addMessage(msg) {
        this.list.push(msg);
        this.render();
    },
    render() {
        const logE1 = document.querySelector('.log');
        logE1.innerHTML = '';


        for (let i in this.list) {
            logE1.innerHTML += `<li>${this.list[i]}<li>`;
        }
    }
}