
cleanMap () {
    const gameMapHTML = document.getElementById('gameMap');
    while(gameMapHTML.firstChild) {
        gameMapHTML.removeChild(gameMapHTML.firstChild);
    }
}

initMap () {
    const nbrRow = document.getElementById('nbrRow').value;
    const nbrCol = document.getElementById('nbrCol').value;
    controller.initMap(nbrRow, nbrCol);
    controller.activeCase(player1);
}

render () {
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
                case player1 :
                case player2 :
                    col.classList.add('player'+model.gameMap[i][j].id);
                    break;
                case 4:
                    col.classList.add('active');
                    break;
                case 6:
                    col.classList.add('couteau');
            }
            col.onclick = movePlayer;
            gameMapRow[i].appendChild(col);
        }
    }
    controller.desactiveCase();

}

class Render (cls) {
    cleanMap () {
        const gameMapHTML = document.getElementById('gameMap');
        while(gameMapHTML.firstChild) {
            gameMapHTML.removeChild(gameMapHTML.firstChild);
        }
    }

    initMap () {
        const nbrRow = document.getElementById('nbrRow');
        const nbrCol = document.getElementById('nbrCpol');

        this.cls.init(nbrRow, nbrCol);
    }

    rend (opt) {
        this.cleanMap();
        const gameMapHTML = document.getElementById('gameMap');

        for (let i=0; i<model.gameMap.length; i++) {
            const row = document.createElement('tr');
            gameMapHTML.appendChild(row);
        }
    
        let gameMapRow = document.getElementsByTagName('tr');

        switch (opt) {
            case 'player' :
                
        }
    }
}