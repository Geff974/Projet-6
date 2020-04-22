class Controller {
    eraseMap () {
        view.cleanMap();
        model.gameMap.splice(0, model.gameMap.length);
    }

    initMap (nbrRow, nbrCol) {
        this.eraseMap();

        for (let i=0; i<nbrRow; i++) {
            model.gameMap[i] = [];
        }

        for (let i=0; i<nbrRow; i++) {
            for (let j=0; j<nbrCol; j++) {
                model.gameMap[i][j] = 1;
            }
        }

        controller.selectGreyCase();
        controller.initPlace(player1);
        controller.initPlace(player2);
        controller.initPlace(couteau);
        controller.initPlace(pistolet);
        controller.initPlace(fusilleAPompe);
        controller.placeAll();

        view.render();
    }

    selectGreyCase () {
        const nbrGreyCase = document.getElementById('nbrGreyCase').value;
        for (const m in model.gameMap) {
            for (const n in model.gameMap[m]) {
                model.gameMap[m][n] = 1;
            }
        }

        let i = nbrGreyCase;
        do {
            const rand = Math.floor(Math.random() * model.gameMap.length);
            const rand2 = Math.floor(Math.random() * model.gameMap[0].length);
            if (model.gameMap[rand][rand2] != 0) {
                model.gameMap[rand][rand2] = 0;
                i--;
            }
            
        } while (i > 0)
    }

    placeAll () {
        model.gameMap[player1.positionX][player1.positionY] = player1;
        model.gameMap[player2.positionX][player2.positionY] = player2;
        model.gameMap[couteau.positionX][couteau.positionY] = couteau;
        model.gameMap[pistolet.positionX][pistolet.positionY] = pistolet;
        model.gameMap[fusilleAPompe.positionX][fusilleAPompe.positionY] = fusilleAPompe;
    }

    initPlace (obj) {
        let positionX = null;
        let positionY = null;
        do {
            positionX = Math.floor(Math.random() * model.gameMap.length);
            positionY = Math.floor(Math.random() * model.gameMap[0].length);
        } while(model.gameMap[positionX][positionY] != 1);
        obj.move(positionX, positionY)
    }

    desactiveCase () {
        for (let i=0; i<model.gameMap.length; i++) {
            for(let j=0; j<model.gameMap[i].length; j++) {
                if(document.getElementById(i + ":" + j).classList.contains('active')) {
                    document.getElementById(i + ":" + j).classList.remove('active');
                }
            }
        }
    }

    activeCase (obj) {
        controller.desactiveCase();
        const x = parseInt(obj.getPosition('x'), 10);
        const y = parseInt(obj.getPosition('y'), 10);
        const nbrCol = document.getElementById('nbrCol').value;
        const nbrRow = document.getElementById('nbrRow').value;
        
        let i=y+1;
        let nbrCase=3;
        while (i<nbrCol && nbrCase>0) {
            if (!checkCaseAvailab(x, i)) break;
            document.getElementById(x + ":" + i).classList.add('active');
            i++;
            nbrCase--;
        }

        nbrCase=3;
        i=y-1;
        while (i>=0 && nbrCase>0) {
            if (!checkCaseAvailab(x, i)) break;
            document.getElementById(x + ":" + i).classList.add('active');
            i--;
            nbrCase--;
        }

        nbrCase=3;
        i=x+1;
        while (i<nbrRow && nbrCase>0) {
            if (!checkCaseAvailab(i, y)) break;
            document.getElementById(i + ":" + y).classList.add('active');
            i++;
            nbrCase--;
        }

        nbrCase=3;
        i=x-1;
        while (i>=0 && nbrCase>0) {
            if (!checkCaseAvailab(i, y)) break;
            document.getElementById(i + ":" + y).classList.add('active');
            i--;
            nbrCase--;
        }
    }

}