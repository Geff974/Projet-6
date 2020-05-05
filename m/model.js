class Game {
    constructor (map, player1, player2) {
        this.map     = map;
        this.turn    = 1;
        this.player1 = player1;
        this.player2 = player2;
    }

    changeWeapon(player, x, y) {
        if (isNaN(this.map.map[x][y])) {
            player.setWeapon(map.map[x][y]);
        }
    }

    actualiseLife() {
        const lifeP1 = document.getElementById('lifeP1');
        const lifeP2 = document.getElementById('lifeP2');

        lifeP1.innerHTML = this.player1.life;
        lifeP2.innerHTML = this.player2.life;
    }
}

class gameMap {
    constructor () {
        this.map = [];
    }

    init (nbrRow, nbrCol) {
        //Create map with white case
        for (let i=0; i<nbrRow; i++) {
            this.map[i] = [];
        }
        
        for (let i=0; i<nbrRow; i++) {
            for (let j=0; j<nbrCol; j++) {
                this.map[i][j] = 1;
            }
        }
        
        this.selectGreyCase();
        
        this.initPlace(player1);
        this.initPlace(player2);
        this.initPlace(couteau);
        this.initPlace(pistolet);
        this.initPlace(fusilleAPompe);
        this.placeAll();

        render.init();
        this.activeCase(player1);
        game.actualiseLife();
    }
    
    selectGreyCase () {
        let nbrGreyCase = document.getElementById('nbrGreyCase').value;
        
        //Clean grey case
        for (const i in this.map) {
            for (const j in this.map[i]) {
                if (this.map[i].hasOwnProperty(j)) {
                    this.map[i][j] = 1;
                }
            }
        }

        do {
            const rand = Math.floor(Math.random() * this.map.length);
            const rand2 = Math.floor(Math.random() * this.map[0].length);
            if(this.map[rand][rand2] != 0) {
                this.map[rand][rand2] = 0;
                nbrGreyCase--;
            }
        } while (nbrGreyCase)
    }

    placeAll () {
        this.map[player1.X][player1.Y]             = player1;
        this.map[player2.X][player2.Y]             = player2;
        this.map[couteau.X][couteau.Y]             = couteau;
        this.map[pistolet.X][pistolet.Y]           = pistolet;
        this.map[fusilleAPompe.X][fusilleAPompe.Y] = fusilleAPompe;
    }

    initPlace (cls) {
        let posX = null;
        let posY = null;
        do {
            posX = Math.floor(Math.random() * this.map.length);
            posY = Math.floor(Math.random() * this.map[0].length);
        }while (this.map[posX][posY] != 1);
        cls.move(posX, posY);
    }

    desactiveCase() {
        for(let i=0; i<this.map.length; i++) {
            for(let j=0; j<this.map[0].length; j++) {
                if(document.getElementById(i +":" +j).classList.contains('active')) {
                    document.getElementById(i +":" +j).classList.remove('active');
                }
            }
        }
    }

    checkCaseAvailab(x, y) {
        if (this.map[x][y] === 0 || this.map[x][y].hasOwnProperty('id')) {
            return 0;
        } else return 1;
    }

    activeCase(player) {
        this.desactiveCase();

        const {X, Y} = player;

        const nbrCol = document.getElementById('nbrCol').value;
        const nbrRow = document.getElementById('nbrRow').value;
        
        let i=Y+1;
        let nbrCase=3;
        while (i<nbrCol && nbrCase>0) {
            if (!this.checkCaseAvailab(X, i)) break;
            document.getElementById(X + ":" + i).classList.add('active');
            i++;
            nbrCase--;
        }

        nbrCase=3;
        i=Y-1;
        while (i>=0 && nbrCase>0) {
            if (!this.checkCaseAvailab(X, i)) break;
            document.getElementById(X + ":" + i).classList.add('active');
            i--;
            nbrCase--;
        }

        nbrCase=3;
        i=X+1;
        while (i<nbrRow && nbrCase>0) {
            if (!this.checkCaseAvailab(i, y)) break;
            document.getElementById(i + ":" + Y).classList.add('active');
            i++;
            nbrCase--;
        }

        nbrCase=3;
        i=X-1;
        while (i>=0 && nbrCase>0) {
            if (!this.checkCaseAvailab(i, Y)) break;
            document.getElementById(i + ":" + Y).classList.add('active');
            i--;
            nbrCase--;
        }

    }

    cleanPosition (player) {
        const {X, Y} = player;

        this.map[X][Y] = 1;
        render.cleanPosition(X, Y);
    }

}