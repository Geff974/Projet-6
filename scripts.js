const movePlayer = (event) => {
    const eventId = event.target.id;
    switch (model.player1.active) {
        case true:
            model.player1.positionX = eventId.substring(0, 1);
            model.player1.positionY = eventId.substring(2, 3);
            model.player1.active = false;
            model.player2.active = true;
            break;
        case false:
            model.player2.positionX = eventId.substring(0, 1);
            model.player2.positionY = eventId.substring(2, 3);
            model.player1.active = true;
            model.player2.active = false;
            break;
    }
    for (let i=0 ; i<model.gameMap.length ; i++) {
        for (let j=0 ; j<model.gameMap[0].length ; j++) {
            if (model.gameMap[i][j] === 2 || model.gameMap[i][j] === 3) {
                model.gameMap[i][j] = 1;
            }
        }
    }
    controller.placePlayer();
    view.render();

}

const 

model = {
    gameMap: [],
    
    player1: {
        life: 100,
        wapon: 'point',
        positionX: 0,
        positionY: 0,
        active: true
    },

    player2: {
        life: 100,
        wapon: 'point',
        positionX: 0,
        positionY: 0,
        active: false
    }
}

view = {
    cleanMap: function() {
        gameMapHTML = document.getElementById('gameMap');
        while(gameMapHTML.firstChild) {
            gameMapHTML.removeChild(gameMapHTML.firstChild);
        }
    },

    initMap: function() {
        const nbrRow = document.getElementById('nbrRow').value;
        const nbrCol = document.getElementById('nbrCol').value;
        controller.initMap(nbrRow, nbrCol);
    },

    render: function() {
        this.cleanMap();

        const gameMapHTML = document.getElementById('gameMap');

        for (let i=0; i<model.gameMap.length; i++) {
            const row = document.createElement('tr');
            gameMapHTML.appendChild(row);
        }

        let gameMapRow = document.getElementsByTagName('tr');

        for (let i=0; i<model.gameMap.length; i++) {
            for (let j=0; j<model.gameMap[0].length; j++) {
                const col = document.createElement('td');
                col.id = i + ':' + j;
                switch (model.gameMap[i][j]) {
                    case 0:
                        col.classList.add('black-case');
                        break;
                    case 2:
                        col.classList.add('player1');
                        break;
                    case 3:
                        col.classList.add('player2');
                        break;
                }
                col.onclick = movePlayer;
                gameMapRow[i].appendChild(col);
            }
        }


    }

}

controller = {
    eraseMap: function () {
        view.cleanMap();
        model.gameMap.splice(0, model.gameMap.length);
    },

    initMap: function (nbrRow, nbrCol) {
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
        controller.initPlayer();
        controller.placePlayer();

        view.render();
    },

    selectGreyCase: function() {
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
    },

    initPlayer: function() {
        let positionX = null;
        let positionY = null;
        let positionX2 = null;
        let positionY2 = null;

        do {
            positionX = Math.floor(Math.random() * model.gameMap.length);
            positionY = Math.floor(Math.random() * model.gameMap[0].length);
        } while(model.gameMap[positionX][positionY] === 0);

        do {
            positionX2 = Math.floor(Math.random() * model.gameMap.length);
            positionY2 = Math.floor(Math.random() * model.gameMap[0].length);
        } while(model.gameMap[positionX2][positionY2] === 0);

        model.player1.positionX = positionX;
        model.player1.positionY = positionY;
        model.player2.positionX = positionX2;
        model.player2.positionY = positionY2;

    },

    placePlayer: function () {
        model.gameMap[model.player1.positionX][model.player1.positionY] = 2;
        model.gameMap[model.player2.positionX][model.player2.positionY] = 3;
    }

}