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
        this.map[player1.positionX][player1.positionY]             = player1;
        this.map[player2.positionX][player2.positionY]             = player2;
        this.map[couteau.positionX][couteau.positionY]             = couteau;
        this.map[pistolet.positionX][pistolet.positionY]           = pistolet;
        this.map[fusilleAPompe.positionX][fusilleAPompe.positionY] = fusilleAPompe;
    }

    initPlace (cls) {
        let posX = null;
        let posY = null;
        do {
            posX = Math.floor(Math.random() * this.map.length);
            posY = Math.floor(Math.random() * this.map[0].length);
        } while (this.map[posX][posY] !== 1);
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

        const x = parseInt(player.getPosition('x'), 10);
        const y = parseInt(player.getPosition('y'), 10);

        const nbrCol = document.getElementById('nbrCol').value;
        const nbrRow = document.getElementById('nbrRow').value;
        
        let i=y+1;
        let nbrCase=1;
        while (i<nbrCol && nbrCase>0) {
            if (!this.checkCaseAvailab(x, i)) break;
            document.getElementById(x + ":" + i).classList.add('active');
            i++;
            nbrCase--;
        }

        nbrCase=1;
        i=y-1;
        while (i>=0 && nbrCase>0) {
            if (!this.checkCaseAvailab(x, i)) break;
            document.getElementById(x + ":" + i).classList.add('active');
            i--;
            nbrCase--;
        }

        nbrCase=1;
        i=x+1;
        while (i<nbrRow && nbrCase>0) {
            if (!this.checkCaseAvailab(i, y)) break;
            document.getElementById(i + ":" + y).classList.add('active');
            i++;
            nbrCase--;
        }

        nbrCase=1;
        i=x-1;
        while (i>=0 && nbrCase>0) {
            if (!this.checkCaseAvailab(i, y)) break;
            document.getElementById(i + ":" + y).classList.add('active');
            i--;
            nbrCase--;
        }

    }

}