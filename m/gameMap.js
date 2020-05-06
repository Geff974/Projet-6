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

    initPlace (cls) {
        let posX = null;
        let posY = null;
        do {
            posX = Math.floor(Math.random() * this.map.length);
            posY = Math.floor(Math.random() * this.map[0].length);
        } while (this.map[posX][posY] !== 1);
        cls.move(posX, posY);
        this.map[cls.X][cls.Y] = cls;
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

        let {X, Y} = player;
        X = parseInt(X, 10);
        Y = parseInt(Y, 10);

        const nbrCol = document.getElementById('nbrCol').value;
        const nbrRow = document.getElementById('nbrRow').value;
        
        let i=Y+1;
        let nbrCase=1;
        while (i<nbrCol && nbrCase>0) {
            if (!this.checkCaseAvailab(X, i)) break;
            document.getElementById(X + ":" + i).classList.add('active');
            i++;
            nbrCase--;
        }

        nbrCase=1;
        i=Y-1;
        while (i>=0 && nbrCase>0) {
            if (!this.checkCaseAvailab(X, i)) break;
            document.getElementById(X + ":" + i).classList.add('active');
            i--;
            nbrCase--;
        }

        nbrCase=1;
        i=X+1;
        while (i<nbrRow && nbrCase>0) {
            if (!this.checkCaseAvailab(i, Y)) break;
            document.getElementById(i + ":" + Y).classList.add('active');
            i++;
            nbrCase--;
        }

        nbrCase=1;
        i=X-1;
        while (i>=0 && nbrCase>0) {
            if (!this.checkCaseAvailab(i, Y)) break;
            document.getElementById(i + ":" + Y).classList.add('active');
            i--;
            nbrCase--;
        }

    }

}