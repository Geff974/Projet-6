class Game {
    constructor () {
        this.map = [];
        this.playerActif = 0;
    }
}

class Map {
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
        this.init(pistolet);
        this.initPlace(fusilleAPompe);
        this.placeAll();


    }
    
    selectGreyCase () {
        const nbrGreyCase = document.getElementById('nbrGreyCase').value;
        
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
                map[rand][rand2] = 0;
                nbrGreyCase--;
            }
        } while (nbrGreyCase)
    }

    placeAll () {
        this.map[player1.positionX][player1.positionY] = player1;
        this.map[player2.positionX][player2.positionY] = player2;
        this.map[couteau.positionX][couteau.positionY] = couteau;
        this.map[pistolet.positionX][pistolet.positionY] = pistolet;
        this.map[fusilleAPompe.positionX][fusilleAPompe.positionY] = fusilleAPompe;
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




}