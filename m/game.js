class Game {
    constructor (map, player1, player2) {
        this.map          = map;
        this.playerActive = 1;
        this.player1      = player1;
        this.player2      = player2;
        this.turnsLeft    = 2;
    }

    actualiseLife() {
        const lifeP1 = document.getElementById('p1life');
        const lifeP2 = document.getElementById('p2life');

        lifeP1.innerHTML = this.player1.life;
        lifeP2.innerHTML = this.player2.life;
    }
}